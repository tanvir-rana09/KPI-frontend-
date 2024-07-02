const Loading = ({className="text-white"}:{className?:string}) => {
    return (
        <div className="flex gap-1 items-center">
            <span className="animate-spin h-4 w-4 table border-[3px] border-t-gray-500 border-r-gray-500 rounded-full"></span>
			<span className={`${className}`}>Loading</span>
        </div>
    );
};

export default Loading;
