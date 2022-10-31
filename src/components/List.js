import React, { useState, useEffect } from "react";

function List({ 
    propList,
    style,
    listColumns,
    onClick,
    listStyle,
    pagination,
    fetchUsers
}) {

    const [list, setList] = useState(propList || []);

    useEffect(() => {
        if (propList?.length > 0) {
            setList(propList);
        }
    }, [propList]);

    return (
        <div style={{ marginTop: '15px', ...style }}>
            <div style={{ width: "100%", display: "flex", alignItems: "center", background: "#00B4D8", padding: 15, borderRadius: 10 }}>
                {listColumns.map((column, t) => {
                    return (
                        <div key={t} style={{ width: column.width ? column.width : "150px", textAlign: "center", fontSize: 16, color: "white" }}>
                            {column.Header || ""}
                        </div>
                    );
                })}
            </div>

            <div style={{ marginTop: 10, background: "white", borderRadius: 10, overflow: "auto", ...listStyle }}>
                {list?.map((dataItem, k) =>
                    <div key={k} onClick={() => onClick ? onClick(dataItem.login) : undefined} className="cursor-pointer hover:bg-slate-100" style={{ width: "100%", height: "50px", display: "flex", alignItems: "center", padding: 10, borderRadius: 10 }}>
                        {listColumns.map((column, t) => {
                            let value = dataItem[column.accessor];

                            return (
                                <div style={{ width: column.width ? column.width : "150px", display: "flex", alignItems: "center", justifyContent: "center", color: "#03045E" }} key={t + k}>
                                    {column.Cell ?
                                        <>
                                            {column.Cell({ value, original: dataItem })}
                                        </>
                                        :
                                        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "center", ...column.style }}>
                                            {value}
                                        </div>
                                    }
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            
            {pagination &&
                <div style={{ marginTop: 20, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                    <div style={{ cursor: "pointer" }} onClick={()=> fetchUsers("PREV")}>Previus</div>
                    <div style={{ cursor: "pointer" }} onClick={() => fetchUsers("NEXT")}>Next</div>
                </div>
            }

        </div>
    )
}

export default List;