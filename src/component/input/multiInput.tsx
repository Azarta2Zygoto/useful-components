import { JSX, useState, useEffect, useRef, Fragment } from 'react';
import Tooltip from '../tooltip/tooltip';
import Icon from '../utils/icon';
import { Displayer } from '../formInfo/inputInfo';
import type { DisplayerProps } from '../formInfo/inputInfo';

interface DisplayerWithindexProps {
    // Spread DisplayerProps when using Displayer component
    value: string[]|number[];
    values?: string[][];
    getChange?: (e: React.ChangeEvent<HTMLInputElement>, index:number) => void;
    getValues?: (values: string[], index:number) => void;
    getValue?: (value: string, index:number) => void;
    getNumber?: (value: number, index:number) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>, index:number) => void;
    // Add all DisplayerProps fields here if needed, or use composition when passing props
}

type Override<T, U> = Omit<T, keyof U> & U;
type DisplayerWithIndexProps = Override<DisplayerProps, DisplayerWithindexProps>;


interface MultiInputProps {
    title: string;
    headers: string[];
    inputs: DisplayerWithIndexProps[];
    minElements?: number;
    maxElements?: number;
    validationDisabling?: boolean;
    focusChange?: boolean;
    getNumberOfElements?: (n: number) => void;
}

export default function MultiInput({
    title,
    headers,
    inputs,
    minElements,
    maxElements,
    validationDisabling,
    focusChange,
    getNumberOfElements,
}: MultiInputProps):JSX.Element {
    const [numberOfElements, setNumberOfElements] = useState<number>(minElements ? minElements : 1);
    const [rowsValid, setRowsValid] = useState<boolean[]>(Array(numberOfElements).fill(false));

    function overwriteGetChange(e: React.ChangeEvent<HTMLInputElement>, numero:number, index:number) {
        if (inputs[numero].getChange) {
            inputs[numero].getChange?.(e, index);
        }
    }

    function overwriteGetValue(value:string, numero:number, index:number) {
        if (inputs[numero].getValue) {
            inputs[numero].getValue?.(value, index);
        }
    }
    function overwriteGetNumber(value:number, numero:number, index:number) {
        if (inputs[numero].getNumber) {
            inputs[numero].getNumber?.(value, index);
        }
    }
    function overwriteOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>, numero:number, index:number) {
        if (inputs[numero].onKeyDown) {
            inputs[numero].onKeyDown?.(e, index);
        }
    }

    function overwriteGetValues(values:string[], numero:number, index:number) {
        if (inputs[numero].getValues) {
            inputs[numero].getValues?.(values, index);
        }
    }

    function handleAddNewElement() {
        setNumberOfElements(numberOfElements + 1);
        setRowsValid([...rowsValid, false]);
        getNumberOfElements?.(numberOfElements + 1);
    }

    function handleValidateRow(index:number) {
        const newRowsValid = [...rowsValid];
        newRowsValid[index] = true;
        setRowsValid(newRowsValid);
    }

    function handleChangeRow(index:number) {
        const newRowsValid = [...rowsValid];
        newRowsValid[index] = false;
        setRowsValid(newRowsValid);
    }

    function handleEraseElement(index:number) {
        if (numberOfElements <= (minElements ?? 1)) return;

        setNumberOfElements(numberOfElements - 1);
        const newRowsValid = [...rowsValid];
        newRowsValid.splice(index, 1);
        setRowsValid(newRowsValid);
        getNumberOfElements?.(numberOfElements - 1);
    }

    return (
        <fieldset className={`multi-input-fieldset ${rowsValid.includes(false) ? 'invalid' : 'valid'}`}>
            <legend>{title}</legend>
            <table className='multi-input-table'>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            Actions
                            {numberOfElements < (maxElements ?? Infinity) && (
                                <Tooltip
                                    title={rowsValid.includes(false) ? "" : "New row"}
                                    active={!rowsValid.includes(false)}
                                >
                                    <button
                                        type="button"
                                        className='background-click'
                                        aria-label='Add a new row'
                                        disabled={rowsValid.includes(false)}
                                        aria-disabled={rowsValid.includes(false)}
                                        onClick={handleAddNewElement}
                                        style={{marginLeft: "5px"}}
                                    >
                                        <Icon name="plus-circle-fill" />
                                    </button>
                                </Tooltip>
                            )}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {numberOfElements > 0 && Array.from({ length: numberOfElements }, (_, rowIndex) => (
                        <Fragment key={rowIndex}>
                            <tr className={rowsValid[rowIndex] ? 'valid-row' : 'invalid-row'}>
                                {inputs.map((inputProps, index) => (
                                    <td key={index}>
                                        <Displayer
                                            {...inputProps}
                                            value={inputProps.value[rowIndex] ?? (typeof inputProps.value[0] === 'number' ? 0 : "")}
                                            values={inputProps.values ? inputProps.values[rowIndex] : undefined}
                                            disabled={validationDisabling&&rowsValid[rowIndex]}
                                            getChange={(e) => overwriteGetChange(e, index, rowIndex)}
                                            getValue={(value) => overwriteGetValue(value, index, rowIndex)}
                                            getNumber={(value) => overwriteGetNumber(value, index, rowIndex)}
                                            getValues={(values) => overwriteGetValues(values, index, rowIndex)}
                                            onKeyDown={(e) => overwriteOnKeyDown(e, index, rowIndex)}
                                        />
                                    </td>
                                ))}
                                <td>
                                    <div className='inline-actions'>
                                        {rowsValid[rowIndex] ? (
                                            <Tooltip
                                                title="Modify this row"
                                            >
                                                <button
                                                    type="button"
                                                    className='background-click'
                                                    aria-label='Modify this row'
                                                    onClick={() => handleChangeRow(rowIndex)}
                                                >
                                                    <Icon name="edit-square-fill" size={20}/>
                                                </button>
                                            </Tooltip>
                                        ) : (
                                            <Tooltip
                                                title="Validate this row"
                                            >
                                                <button
                                                    type="button"
                                                    className='background-click'
                                                    aria-label='Validate this row'
                                                    onClick={() => handleValidateRow(rowIndex)}
                                                >
                                                    <Icon name="check-circle-fill" size={20} />
                                                </button>
                                            </Tooltip>
                                        )}
                                        {numberOfElements > (minElements ?? 1) && (
                                            <Tooltip
                                                title="Delete this row"
                                            >
                                                <button
                                                    type="button"
                                                    className='background-click'
                                                    aria-label='Delete this row'
                                                    onClick={() => handleEraseElement(rowIndex)}
                                                >
                                                    <Icon name="trash-fill" size={20} />
                                                </button>
                                            </Tooltip>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </fieldset>
    );
}