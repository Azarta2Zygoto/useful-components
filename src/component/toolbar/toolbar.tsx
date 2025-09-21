"use client";

import React, { useState, useEffect, JSX, Fragment } from "react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Tooltip from "../tooltip/tooltip";
import './toolbar.css';

interface ToolbarPaths {
    name: string;
    icon: string;
    subpath?: ToolbarPaths[];
    [key: string]: string | ToolbarPaths[] | undefined;
}

interface ToolbarProps {
    toolbarData: ToolbarPaths[];
    isActive?: boolean;
    isActiveDefault?: boolean;
    innerChange?: boolean;
    tooltip?: boolean;
    type?:"expand"|"menu";
    text?:{
        fermer?: string,
        ouvrir?: string,
    }
    children?: React.ReactNode;
    underChildren?: React.ReactNode;
    displayDifferentName?: (name:string) => string;
    getPath?: (path:string, subPath:string) => void;
    getActive?: (active:boolean) => void;
}

export default function Toolbar({
    toolbarData,
    isActive = false,
    isActiveDefault,
    innerChange = true,
    tooltip = true,
    type = "expand",
    text,
    children,
    underChildren,
    displayDifferentName,
    getPath,
    getActive
}:ToolbarProps):JSX.Element {
    const pathname = usePathname();

    const [path, setPath] = useState<string>('');
    const [subPath, setSubPath] = useState<string>('');
    const [internIsActive, setInternaIsActive] = useState<boolean>(isActiveDefault!==undefined?isActiveDefault:isActive);
    const [subPathOpen, setSubPathOpen] = useState<(boolean|null)[]>([]);

    useEffect(() => {
        setInternaIsActive(isActive);
    }, [isActive]);

    useEffect(() => {
        const newToolbarOpen: (boolean|null)[] = [];
        toolbarData.forEach((item) => {
            if (item.subpath&&item.subpath.length > 0) {
                newToolbarOpen.push(false);
            } else {
                newToolbarOpen.push(null);
            }
        });
        setSubPathOpen(newToolbarOpen);
    }, [toolbarData]);
    
    useEffect(() => {
        // Remove leading slash and split the path
        const [newPath, newSubPath] = (pathname || '').replace(/^\//, '').split('/');

        if (getPath) getPath(newPath || 'accueil', newSubPath || '');
        setPath(newPath);
        if (newSubPath) setSubPath(newSubPath);
        else setSubPath('');
        
    }, [pathname, getPath]);

    function handleClickOpen(event: React.MouseEvent<HTMLButtonElement>, index:number) {
        event.stopPropagation();
        event.preventDefault();

        setSubPathOpen(prev => prev.map((open, i) => i === index ? !open : open));
    }

    function handleToolbarActivation() {
        setInternaIsActive(prev => {
            const newState = !prev;
            if (getActive) getActive(newState);
            return newState;
        });
    }

    return (
        <div
            className={internIsActive ? "toolbar active" : "toolbar"}
        >
            {innerChange&& (
                <Tooltip
                    title={internIsActive ? text?.fermer||"close" : text?.ouvrir||"open"}
                    active={tooltip}
                    style={{margin:"25px 0"}}
                >
                    <button
                        className="active-button"
                        type="button"
                        onClick={handleToolbarActivation}
                        aria-label={internIsActive ? text?.fermer||"close" : text?.ouvrir||"open"}>
                        <i className="bi bi-justify"/>
                    </button>
                </Tooltip>
            )}
            {children}
            <nav>
                {toolbarData.map((item, index) => {
                    const name = item.name;
                    const key = name.toLowerCase().replace(/\s+/g, '-');
                    return (
                        <Fragment key={index}>
                            <Tooltip
                                title={displayDifferentName?displayDifferentName(name):name}
                                active={tooltip&&!internIsActive}
                                keepWrapper={true}
                            >
                                <Link
                                    key={index}
                                    id={`${key}-link-${index}`}
                                    className={"link "+((path===key||path===""&&key==="accueil")?'selected':'')}
                                    href={key==='accueil'?"//":`/${key}`}
                                >
                                    <i className={item.icon+" i"}/>
                                    <span
                                        style={{
                                            width: type==="expand" && item.subpath && item.subpath.length !== 0 && path!== key ? 'calc(100% - 50px)' : undefined,
                                            marginRight: type==="expand" && item.subpath && item.subpath.length !== 0 && path!== key ? '25px' : undefined,
                                        }}>
                                        {displayDifferentName?displayDifferentName(name):name}
                                        {type==="expand" && item.subpath && item.subpath.length !== 0 && path!== key && (
                                            <button
                                                type="button"
                                                className="expand background-click"
                                                onClick={(e)=>handleClickOpen(e, index)}
                                                aria-label={internIsActive ? text?.fermer||"close" : text?.ouvrir||"open"}
                                                style={{
                                                    display:internIsActive?'block':'none',
                                                    width:"16px",
                                                    height:"16px",
                                                    position:"absolute",
                                                    right:"0px",
                                                    top:"0px",
                                                    margin:"7px"
                                                }}
                                            >
                                                <i className={subPathOpen[index]?"bi bi-chevron-contract":"bi bi-chevron-expand"}/>
                                            </button>
                                        )}
                                    </span>
                                </Link>
                            </Tooltip>
                            {type==="expand" && item.subpath && item.subpath.length !== 0 && (
                                <ul
                                    id={'ul-'+key}
                                    className={path===key||subPathOpen[index]?'subpath active':'subpath'}
                                    style={{
                                        height: path===key||subPathOpen[index] ? `${35*item.subpath.length}px` : '0px',
                                    }}>
                                    {item.subpath && item.subpath.map((subItem, subIndex) => {
                                        const subKey = subItem.name.toLowerCase().replace(/\s+/g, '-');
                                        return (
                                            <li key={subIndex}
                                                style={{
                                                    height: path===key||subPathOpen[index] ? `35px` : '0px',
                                                }}>
                                                <Tooltip
                                                    title={displayDifferentName?displayDifferentName(subItem.name):subItem.name}
                                                    active={tooltip&&!internIsActive}
                                                    keepWrapper={true}
                                                >
                                                    <Link
                                                        key={key+'-'+subKey}
                                                        id={key+'-'+subKey+'-link-'+subIndex}
                                                        className={"link mini"+((key===path&&subPath===subKey)?' selected':'')}
                                                        href={`/${key}/${subKey}`}>
                                                        <i className={subItem.icon+" i"}/>
                                                        <span>{displayDifferentName?displayDifferentName(subItem.name):subItem.name}</span>
                                                    </Link>
                                                </Tooltip>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </Fragment>
                    );
                })}
                </nav>
            {underChildren}
        </div>
    );
}
