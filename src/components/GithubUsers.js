import React, { useState, useEffect } from "react";
import List from './List';
import Modal from './Modal'
import { MdSearch, MdOpenInNew } from 'react-icons/md';
import { BsGithub } from 'react-icons/bs';

function GithubUsers() {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const [userRepo, setUserRepo] = useState([]);

    const mock = [
        { avatar_url: "https://avatars.githubusercontent.com/u/85590315?v=4", login: "thristan-9", id: 33, html_url: "https://github.com/thristan-9"},
        { avatar_url: "https://avatars.githubusercontent.com/u/85590315?v=4", login: "thristan-9", id: 33, html_url: "https://github.com/thristan-9"},
        { avatar_url: "https://avatars.githubusercontent.com/u/85590315?v=4", login: "thristan-9", id: 33, html_url: "https://github.com/thristan-9"},
        { avatar_url: "https://avatars.githubusercontent.com/u/85590315?v=4", login: "thristan-9", id: 33, html_url: "https://github.com/thristan-9"},
        { avatar_url: "https://avatars.githubusercontent.com/u/85590315?v=4", login: "thristan-9", id: 33, html_url: "https://github.com/thristan-9"}
    ];

    const listColumns = [
        {
            Header: "Avatar", accessor: 'avatar_url', width: "33%", Cell: row => {
                return (
                    <img alt="" className="rounded-full" src={row.value} width="40px" height="40px" />
                );
            }
        },
        {
            Header: "Login", accessor: 'login', width: "33%"
        },
        {
            Header: "id", accessor: 'id', width: "33%"
        },
    ];

    const repoColumns = [
        {
            Header: "Name", accessor: 'name', width: "33%"
        },
        {
            Header: "id", accessor: 'id', width: "33%"
        },
        {
            Header: "Url", accessor: 'html_url', width: "33%", Cell:(row) => {
                return (
                    <MdOpenInNew className="cursor-pointer text-xl" onClick={() => {
                        window.open(row?.value, "_blank");
                    }} />
                );
            }
        }
    ];

    useEffect(() => {
        //setUsers(mock)
        fetchUsers();
    }, []);


    function fetchUsers(action) {
       let since = 0
        console.log("action", action);
        
        if (users?.length > 0) {
           console.log("users[0]", users[0].id);
           since = action == "PREV" ? (users[0].id - 6) : users[users.length - 1]?.id;
       }

        console.log("since", since);

       if (since < 0 ) since = 0;

        fetch("/api/list_users?" + new URLSearchParams({
            since,
            per_page: 5
        }))
        .then(response => response.json())
        .then((data) => {
            setUsers(data.results);
        })
    };

    function getUser(name) {
        fetch("/api/get_user_info?" + new URLSearchParams({
            username: name
        }))
            .then(response => response.json())
            .then((data) => {
                setUserInfo(data.info);
                setUserRepo(data.repositorys)
            }) 
    };

    function formatDt(createDt) {
        const newDate = new Date(createDt);
        const year = newDate.getFullYear();
        let month = newDate.getMonth() + 1; 
        let day = newDate.getDate();
        console.log("month", month);
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        console.log("month", month);


        return year + "-" + month + "-" + day;
     }

    return (
        <div className="w-screen h-screen overflow-hidden">

            <div className="w-full h-auto mt-24 flex flex-col justify-center">

                <div className="w-[40%] px-10 rounded-lg mx-auto bg-blue-200 flex flex-col justify-center items-center">
                    <div className="flex text-white text-3xl py-5 justify-between items-center">
                        Github Profile
                        <BsGithub className="animate-bounce text-white text-2xl ml-3" />
                    </div>
                    <div className="pb-6 flex items-center justify-between">
                        <input value={username} onChange={(e) => {
                            setUsername(e.target.value);
                        }} className="border-0 appearance-none p-3 rounded-lg w-60 text-xs bg-white" type={"text"} />
                        <MdSearch onClick={() => {
                            getUser(username);
                        }} className="text-white text-2xl ml-3 cursor-pointer" />
                    </div>
                </div>

                <div className="mt-10 flex justify-center items-center">
                    <List
                        propList={users}
                        style={{ width: "40%", height: "100%" }}
                        listColumns={listColumns}
                        pagination={true}
                        onClick={(name) => getUser(name)}
                        fetchUsers={(action) => fetchUsers(action)}
                    />
                </div>

                {userInfo &&
                    <Modal userInfo={userInfo} onClose={() => setUserInfo(null)}>
                        <div className="flex flex-col text-white">
                            <div className="flex justify-between items-center px-10">
                                <div>{"id: " + userInfo?.id}</div>
                                <div>{"Created at: " + formatDt(userInfo?.created_at)}</div>
                                <MdOpenInNew className="cursor-pointer text-xl" onClick={() => {
                                    window.open(userInfo?.html_url, "_blank");
                                }} />
                            </div>

                            <div className="w-full">
                                <List
                                    propList={userRepo}
                                    style={{ width: "100%", height: "100%" }}
                                    listStyle={{height: "10rem"}}
                                    listColumns={repoColumns}
                                />
                            </div>

                        </div>
                    </Modal>
                }
            </div>

        </div>
    );
}

export default GithubUsers;