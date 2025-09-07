import { useState, useEffect, JSX, Fragment, useRef } from 'react';
import MultipleMenuSelect from '../multipleMenuSelect/multipleMenuSelect';
import { TableVirtuoso, VirtuosoHandle } from 'react-virtuoso';
import Tooltip from '../tooltip/tooltip';
import './table.css'

const defaultRowsPerPageOptions = [5, 10, 25, 50, 100];
const defaultRowsPerPage = 10;

type placementType = "left" | "center" | "right";
interface TableProps {
    name: string;
    data: { [key: string|number]: string|number|JSX.Element }[];
    headerTitles?: string[];
    title?: string;
    footer?: JSX.Element;
    width?: number|number[];
    selected?:number;
    centering?: placementType[];
    filterable?: "in-hover" | "in-always" | "outside";
    sortable?: boolean;
    paginated?: boolean;
    rowsPerPageOptions?: number[];
    rowsPerPage?: number;
    virtual?: boolean;
    tooltip?: boolean;
    box?: boolean;
    text?: {
        hide?: string;
        filterable?: string;
        download?: string;
        sortAscending?: string;
        sortDescending?: string;
    }
    boxStyle?: React.CSSProperties;
    onDownload?: (titles:string[]) => void;
    onClickRow?: (event: React.MouseEvent<HTMLTableRowElement>, colonne:number) => void;
    onClickCell?: (event: React.MouseEvent<HTMLTableCellElement>, ligne:number, colonne:number) => void;
}

export default function Table({
    name,
    data,
    headerTitles,
    title,
    box,
    selected,
    filterable,
    sortable,
    paginated,
    rowsPerPageOptions = defaultRowsPerPageOptions,
    rowsPerPage = defaultRowsPerPage,
    centering,
    virtual,
    width,
    footer,
    tooltip = true,
    text = {
        hide: "Hide Column",
        filterable: "Filter Column",
        download: "Download",
        sortAscending: "Sort Ascending",
        sortDescending: "Sort Descending"
    },
    boxStyle,
    onDownload,
    onClickRow,
    onClickCell,
}: TableProps):JSX.Element {
    const tableRef = useRef<HTMLTableElement>(null);
    const virtuosoRef = useRef<VirtuosoHandle>(null);

    const [dataDisplayed, setDataDisplayed] = useState(data);
    const [viewableItems, setViewableItems] = useState<(string|null)[]>(headerTitles??data.length>0?Object.keys(data[0]):[]);
    const [correctHeaderTitles, setCorrectHeaderTitles] = useState<string[]>(headerTitles??data.length>0?Object.keys(data[0]):[]);
    const [isHovered, setIsHovered] = useState(false);
    const [selectedRow, setSelectedRow] = useState<number>(selected ?? -1);
    const [tabuledRow, setTabuledRow] = useState<number>(-1);
    const [selectedCell, setSelectedCell] = useState<{x:number, y:number}>({ x: -1, y: -1 });
    const [tabuledCell, setTabuledCell] = useState<{x:number, y:number}>({ x: -1, y: -1 });
    const [totalWidth, setTotalWidth] = useState<number>(300);
    const [sort, setSort] = useState<{column: number, direction: "asc" | "desc"}>({column: -1, direction: "asc"});

    useEffect(() => {
        setDataDisplayed(data);
    }, [data]);

    useEffect(() => {
        if (Array.isArray(width)) {
            const sum = width.reduce((acc, val) => acc + val, 0);
            setTotalWidth(sum > 0 ? sum : 300);
        }
        else setTotalWidth(width ?? 300);
    }, [width]);
    
    useEffect(() => {
        setSelectedRow(selected ?? -1);
        setTabuledRow(selected ?? -1);
    }, [selected]);

    useEffect(() => {
        setViewableItems(headerTitles??data.length>0?Object.keys(data[0]):[]);
        setCorrectHeaderTitles(headerTitles??data.length>0?Object.keys(data[0]):[]);
    }, [headerTitles, data]);

    function reinitTabuled() {
        console.log("Reinit tabuled");
        setTabuledRow(-1);
        setTabuledCell({ x: -1, y: -1 });
    }

    function handleResize(newViewableItems: (string|null)[]) {
        let count = 0;
        correctHeaderTitles.forEach((title, index) => {
            if (newViewableItems.includes(title)) {
                count = count + (width&&Array.isArray(width) ? width[index] : 0);
            }
        });
        if (count>0) setTotalWidth(count);
        else setTotalWidth(300);
    }

    function handleFilterable(title: string) {
        if (!viewableItems.includes(title) || countNulls(viewableItems) > correctHeaderTitles.length - 2) return;
        
        const newViewableItems = viewableItems.map(item => item === title ? null : item);
        setViewableItems(newViewableItems);
        handleResize(newViewableItems);
    }

    function handleShowing(valideValue: string[]) {
        if (valideValue.length === 0) return;
        console.log(valideValue);

        const newWiewableItems:(string|null)[] = [];
        
        correctHeaderTitles.forEach((title) => {
            if (valideValue.includes(title)) {
                newWiewableItems.push(title);
            }
            else {
                newWiewableItems.push(null);
            }
        });
        setViewableItems(newWiewableItems);
        handleResize(newWiewableItems);
    }

    function handleClickColumn(event: React.MouseEvent<HTMLTableRowElement>, colonne: number) {
        if (!onClickRow) return;

        onClickRow(event, colonne);
        setTabuledRow(colonne);
        setSelectedRow(colonne);
    }

    function handleClickCell(event: React.MouseEvent<HTMLTableCellElement>, ligne: number, colonne: number): void {
        if (!onClickCell) return;

        onClickCell(event, ligne, colonne);
        setSelectedCell({ x: ligne, y: colonne });
        setTabuledCell({ x: ligne, y: colonne });
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        
        const visibleColumns = viewableItems.filter(item => item !== null).length;
        const maxRow = data.length - 1;
        
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                if (onClickCell) {
                    // In cell selection mode
                    if (tabuledCell.x > 0) {
                        const newX = tabuledCell.x - 1;
                        setTabuledCell({ x: newX, y: tabuledCell.y });
                        scrollToRow(newX);
                    }
                } else {
                    // In row selection mode
                    if (tabuledRow > 0) {
                        const newRow = tabuledRow - 1;
                        setTabuledRow(newRow);
                        scrollToRow(newRow);
                    }
                }
                break;
                
            case 'ArrowDown':
                e.preventDefault();
                if (onClickCell) {
                    // In cell selection mode
                    if (tabuledCell.x < maxRow) {
                        const newX = tabuledCell.x + 1;
                        setTabuledCell({ x: newX, y: tabuledCell.y });
                        scrollToRow(newX);
                    }
                } else {
                    // In row selection mode
                    if (tabuledRow < maxRow) {
                        const newRow = tabuledRow + 1;
                        setTabuledRow(newRow);
                        scrollToRow(newRow);
                    }
                }
                break;
                
            case 'ArrowLeft':
                e.preventDefault();
                if (onClickCell) {
                    // In cell selection mode, move left within a row
                    let newY = tabuledCell.y;
                    // Skip hidden columns
                    do {
                        newY = (newY - 1 + visibleColumns) % visibleColumns;
                    } while (viewableItems[newY] === null && newY !== tabuledCell.y);
                    
                    setTabuledCell({ x: tabuledCell.x, y: newY });
                }
                break;
                
            case 'ArrowRight':
                e.preventDefault();
                if (onClickCell) {
                    // In cell selection mode, move right within a row
                    let newY = tabuledCell.y;
                    // Skip hidden columns
                    do {
                        newY = (newY + 1) % visibleColumns;
                    } while (viewableItems[newY] === null && newY !== tabuledCell.y);
                    
                    setTabuledCell({ x: tabuledCell.x, y: newY });
                }
                break;
                
            case 'Enter':
                // If in row selection mode, activate cell selection mode
                if (!onClickCell && tabuledRow >= 0) {
                    if (onClickRow) {
                        onClickRow(e as unknown as React.MouseEvent<HTMLTableRowElement>, tabuledRow);
                    }
                    setSelectedRow(tabuledRow);
                }
                else if (onClickCell && tabuledCell.x >= 0 && tabuledCell.y >= 0) {
                    if (onClickCell) {
                        onClickCell(e as unknown as React.MouseEvent<HTMLTableCellElement>, tabuledCell.x, tabuledCell.y);
                    }
                    setSelectedCell({ x: tabuledCell.x, y: tabuledCell.y });
                }
                break;
                
            case 'Escape':
                // Exit cell selection mode
                if (onClickCell) {
                    setSelectedCell({ x: -1, y: -1 });
                }
                break;
        }
    };
    
    const scrollToRow = (rowIndex: number) => {
        if (virtual) {
            // For virtualized table
            if (virtuosoRef.current && typeof virtuosoRef.current.scrollToIndex === 'function') {
                virtuosoRef.current.scrollToIndex({ index: rowIndex });
            }
        } else {
            // For regular table
            const row = document.getElementById(`${name}-table-${rowIndex}`);
            if (row) {
                row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    };

    function handleSorting(title: string, direction: "asc" | "desc"): void {
        if (!sortable) return;

        const index = Object.keys(data[0]).indexOf(title);
        if (index === -1) return;

        const sortedData = [...dataDisplayed];
        const isNumeric = sortedData.every(item => typeof item[title] === 'number');

        sortedData.sort((a, b) => {
            if (isNumeric) {
                return direction === "asc" ? (b[title] as number) - (a[title] as number) : (a[title] as number) - (b[title] as number);
            }
            else {
                return direction === "asc" ? String(b[title]).localeCompare(String(a[title])) : String(a[title]).localeCompare(String(b[title]));
            }
        });
        setSort({column: index, direction: direction});
        setDataDisplayed(sortedData);
    }

    function makeHeader(): JSX.Element {
        return (
            <tr>
                {correctHeaderTitles.map((title, i) => (
                    <th key={i}
                        style={{
                            width: viewableItems.includes(title) ? (width&&Array.isArray(width) ? `${width[i]/totalWidth}px` : undefined) : 0,
                            visibility: viewableItems.includes(title) ?undefined:"collapse",
                            padding: viewableItems.includes(title) ? undefined : 0,
                            overflow: viewableItems.includes(title) ? undefined : 'hidden',
                            maxWidth: viewableItems.includes(title) ? (width&&Array.isArray(width) ? `${width[i]/totalWidth}px` : undefined) : 0,
                            border: viewableItems.includes(title) ? undefined : 'none'
                        }}>
                            <div className={`table-header${filterable||sortable?"-icon":""}`}>
                        {(filterable === "in-hover" || filterable === "in-always") && firstNonNull(viewableItems) === i && (
                            <MultipleMenuSelect
                                id={name + "-table-filterable"}
                                selectedOptions={viewableItems.filter(item => item !== null)}
                                options={correctHeaderTitles}
                                onSelect={handleShowing}
                                checkbox={"left"}
                                tooltip={tooltip?text?.filterable:false}
                                style={{
                                    opacity: filterable === "in-hover" ? (isHovered ? 1 : 0) : 1,
                                    transition: "opacity 0.3s ease-in-out",
                                    padding: "0",
                                    margin:"0",
                                    minWidth: "30px",
                                    minHeight: "25px",
                                    maxWidth: "30px",
                                    maxHeight: "25px",
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="background-click">
                                        <desc>Icon showing an eye, representing view options</desc>
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                                    </svg>
                            </MultipleMenuSelect>
                        )}
                        {filterable && firstNonNull(viewableItems) !== i && (
                            <span style={{width:"26px"}}></span>
                        )}
                        {sortable && (
                            <span style={{width:"26px"}}></span>
                        )}
                        {title}
                        {filterable && (
                            <Tooltip title={text?.hide || "Hide Column"} active={tooltip}>
                                <button
                                    className={`background-click`}
                                    aria-label={text?.filterable || "Hide Column"}
                                    onClick={() => { handleFilterable(title) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <desc>Icon showing an eye with a slash through it, representing hidden state</desc>
                                            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                                            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                                        </svg>
                                </button>
                            </Tooltip>
                        )}
                        {sortable && (
                            <div className="table-sort-buttons">
                                <Tooltip title={text?.sortAscending || "Sort Ascending"} active={tooltip}>
                                    <button
                                        className={`background-click ${(sort.column === i&&sort.direction==="asc") ? "selected" : ""}`}
                                        aria-label={text?.sortAscending || "Sort Ascending"}
                                        onClick={() => { handleSorting(Object.keys(data[0])[i], "asc") }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <desc>Icon showing an arrow pointing up, representing ascending sort</desc>
                                                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                                            </svg>
                                    </button>
                                </Tooltip>
                                <Tooltip title={text?.sortDescending || "Sort Descending"} active={tooltip}>
                                    <button
                                        className={`background-click ${(sort.column === i&&sort.direction==="desc") ? "selected" : ""}`}
                                        aria-label={text?.sortDescending || "Sort Descending"}
                                        onClick={() => { handleSorting(Object.keys(data[0])[i], "desc") }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <desc>Icon showing an arrow pointing down, representing descending sort</desc>
                                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                            </svg>
                                    </button>
                                </Tooltip>
                            </div>
                        )}
                        </div>
                    </th>
                ))}
            </tr>
        );
    }

    function makeContent(data:{ [key: string|number]: string|number|JSX.Element }, index:number): JSX.Element {
        return (
            <Fragment key={index}>
                {Object.keys(data).map((key, i) => (
                    <td
                        key={i}
                        className={(onClickCell ? "table-cell-hover " : "") +
                            ((selectedCell.x === index && selectedCell.y === i) ? " table-cell-selected " : "") +
                            ((tabuledCell.x === index && tabuledCell.y === i) ? " table-cell-tabuled " : "")}
                        onClick={(e) => handleClickCell(e, index, i)}
                        style={{
                            textAlign: centering ? centering[i] : "left",
                            visibility: viewableItems.includes(correctHeaderTitles[i]) ?undefined:"collapse",
                            padding: viewableItems.includes(correctHeaderTitles[i]) ? undefined : 0,
                            overflow: viewableItems.includes(correctHeaderTitles[i]) ? undefined : 'hidden',
                            maxWidth: viewableItems.includes(correctHeaderTitles[i]) ? (width&&Array.isArray(width) ? `${width[i]/totalWidth}px` : undefined) : 0,
                            border: viewableItems.includes(correctHeaderTitles[i]) ? undefined : 'none'
                        }}>
                        {data[key]}
                    </td>
                ))}
            </Fragment>
        );
    }

    if (box||title||onDownload||filterable==="outside"||paginated) {
        return (
            <div style={{overflow:"auto", overflowY:"hidden"}}>
            <div className="limit-table component-box"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                onBlur={()=>reinitTabuled()}
                style={boxStyle}>
                    {onDownload && (
                        <Tooltip title={text?.download || "Download"} active={tooltip}>
                            <button
                            className='background-click'
                            aria-label={text?.download || "Download"}
                            onClick={()=>onDownload?.(viewableItems.filter(item => item !== null))}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <desc>Icon showing a box with an arrow pointing down into it, representing download</desc>
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                                </svg>
                            </button>
                        </Tooltip>
                    )}
                    {filterable==="outside" && (
                        <MultipleMenuSelect
                                id={name + "-table-filterable"}
                                className='void'
                                selectedOptions={viewableItems.filter(item => item !== null)}
                                options={correctHeaderTitles}
                                onSelect={handleShowing}
                                checkbox={"left"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="background-click">
                                        <desc>Icon showing an eye, representing view options</desc>
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                                    </svg>
                            </MultipleMenuSelect>
                    )}
                <h1 className="table-title">{title}</h1>
                {virtual ? (
                    <TableVirtuoso
                        ref={virtuosoRef}
                        style={{ height: '500px' }}
                        components={{
                            // These are required for TableVirtuoso
                            Table: (props) => <table ref={tableRef} {...props} className="table" />,
                            TableHead: (props) => <thead {...props} />,
                            TableRow: (props) => (
                                <tr 
                                    {...props} 
                                    id={name + "-table-" + props['data-index']} 
                                    className={(selectedRow === props['data-index'] ? "table-row-selected " : "")+
                                        (tabuledRow === props['data-index'] ? "table-row-tabuled " : "")}
                                    onClick={(e) => handleClickColumn(e, props['data-index'])}
                                />
                            ),
                            TableBody: (props) => <tbody {...props} className={
                                (onClickCell?"table-cell-hover":"")+
                                (onClickRow?"table-row-hover":"")}/>,
                            TableFoot: (footerProps) => (footer&&<tfoot {...footerProps}>{footer}</tfoot>)
                        }}
                        data={dataDisplayed}
                        fixedHeaderContent={makeHeader}
                        itemContent={(index, item) => makeContent(item, index)}
                    />
                ) : (
                    <table className="table"
                        ref={tableRef}
                        aria-rowcount={data.length}
                        aria-colcount={viewableItems.filter(item => item !== null).length}>
                        <thead>
                            {makeHeader()}
                        </thead>
                        <tbody className={
                                (onClickCell?"table-cell-hover":"")+
                                (onClickRow?"table-row-hover":"")}>
                            {dataDisplayed.map((item, i) => (
                                <tr
                                    key={i}
                                    id={name + "-table-" + i} 
                                    className={(selectedRow === i ? "table-row-selected " : "")+
                                        (tabuledRow === i ? "table-row-tabuled " : "")}
                                    onClick={(e) => handleClickColumn(e, i)}
                                >
                                    {makeContent(item, i)}
                                </tr>
                            ))}
                        </tbody>
                        {footer && (
                            <tfoot>
                                {footer}
                            </tfoot>
                        )}
                    </table>
                )}
            </div>
            </div>
        );
    }
    else {
        return (
            virtual ? (
            <div style={{overflow:"auto"}}>
                <div className="limit-table"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    onBlur={()=>reinitTabuled()}
                    style={boxStyle}>
                    <TableVirtuoso
                        ref={virtuosoRef}
                        style={{ height: '400px' }}
                        components={{
                            // These are required for TableVirtuoso
                            Table: (props) => <table ref={tableRef} {...props} className="table" />,
                            TableHead: (props) => <thead {...props} />,
                            TableRow: (props) => (
                                <tr 
                                    {...props} 
                                    id={name + "-table-" + props['data-index']} 
                                    className={(selectedRow === props['data-index'] ? "table-row-selected " : "")+
                                        (tabuledRow === props['data-index'] ? "table-row-tabuled " : "")}
                                    onClick={(e) => handleClickColumn(e, props['data-index'])}
                                />
                            ),
                            TableBody: (props) => <tbody {...props} className={
                                (onClickCell?"table-cell-hover":"")+
                                (onClickRow?"table-row-hover":"")} />,
                            TableFoot: (footerProps) => (footer&&<tfoot {...footerProps}>{footer}</tfoot>)
                        }}
                        data={dataDisplayed}
                        fixedHeaderContent={makeHeader}
                        itemContent={(index, item) => makeContent(item, index)}
                    />
                </div>
            </div>
            ) : (
            <div style={{overflow:"auto"}}>
                <div className="limit-table"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    onBlur={()=>reinitTabuled()}
                    style={boxStyle}>
                    <table className="table"
                        ref={tableRef}
                        aria-rowcount={data.length}
                        aria-colcount={viewableItems.filter(item => item !== null).length}>
                        <thead>
                            {makeHeader()}
                        </thead>
                        <tbody className={
                                (onClickCell?"table-cell-hover":"")+
                                (onClickRow?"table-row-hover":"")}>
                            {dataDisplayed.map((item, i) => (
                                <tr
                                    key={i}
                                    id={name + "-table-" + i} 
                                    className={(selectedRow === i ? "table-row-selected " : "")+
                                        (tabuledRow === i ? "table-row-tabuled " : "")}
                                    onClick={(e) => handleClickColumn(e, i)}
                                >
                                    {makeContent(item, i)}
                                </tr>
                            ))}
                        </tbody>
                        {footer && (
                            <tfoot>
                                {footer}
                            </tfoot>
                        )}
                    </table>
                </div>
            </div>
        )
    )}
}

function countNulls(arr: (string|null)[]): number {
    return arr.reduce((count, item) => item === null ? count + 1 : count, 0);
}

function firstNonNull(arr: (string|null)[]): number|null {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== null) {
            return i;
        }
    }
    return null;
}