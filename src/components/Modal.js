import { MdOutlineCancel } from 'react-icons/md';

function Modal(props) {

    return(
        <div className="absolute w-[40%] h-[70%] mt-18 left-0 right-0 bg-blue-200 shadow-lg py-2 px-4 rounded-xl ml-auto mr-auto flex flex-col border-2 border-blue-200 border-solid">
            <div>
                <MdOutlineCancel className="text-white duraration-200 hover:scale-105 text-2xl cursor-pointer float-right mb-auto" onClick={()=> props.onClose()} icon="close" />
            </div>
            <div className="relative w-full flex items-center justify-center py-3 px-3">
                <img className="border-8 border-white border-solid rounded-full w-36 h-36" alt="" src={props.userInfo?.avatar_url} />
            </div>
            <div className="flex justify-center items-center text-white text-xl">{props.userInfo?.login}</div>


            <div className="h-[calc(100%-32rem)] w-full pt-6 pb-4">
                {props.children}
            </div>

        </div>
    )
}

export default Modal;