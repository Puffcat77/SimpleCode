import React, { useMemo } from "react";
import { MyButton } from "./UI/button/MyButton";
import buttonClasses from './UI/button/MyButton.module.css';

export const Pages = ({pagesCount, page, setPage, props}) => {
    const delta = 2;
    const pages = useMemo(() => {
        let middlePages = [];
        let firstPage = 1;
        let lastPage = pagesCount;
        for (let i = page - delta; i <= page + delta; i++) {
            if (i > firstPage && i < pagesCount)
                middlePages.push(i);
        }
        return {
            first: firstPage,
            middle: middlePages,
            last: lastPage
        };
    }, [pagesCount, page]);

    const separator = (borderPage) => {
        return pages.middle[0] == borderPage + 1 
        || pages.middle[pages.middle.length - 1] == borderPage - 1 
        ? <div></div>: <div style={{display:'flex', alignItems:'center'}}>...</div>
    }

    return (
        <div 
            style={{display:'flex', 
                alignContent: 'center', 
                justifyContent:'center' }}>
            <MyButton 
                    key={'first'} 
                    value={pages.first} 
                    customClasses={ [
                            buttonClasses.pageButton, 
                            pages.first == page ? buttonClasses.activePage: ''
                        ].join(' ')}
                    onClick={()=> setPage(pages.first)}/>
            { separator(pages.first)}
            {
            pages?.middle?.map(p => 
                <MyButton 
                    key={p} 
                    value={p} 
                    customClasses={ [
                            buttonClasses.pageButton, 
                            p == page ? buttonClasses.activePage: ''
                        ].join(' ')}
                    onClick={()=> setPage(p)}
                />) 
            }
            {separator(pages.last)}
            <MyButton 
                    key={'last'} 
                    value={pages.last} 
                    customClasses={ [
                            buttonClasses.pageButton, 
                            pages.last == page ? buttonClasses.activePage: ''
                        ].join(' ')}
                    onClick={()=> setPage(pages.last)}/>
        </div>
    );
}