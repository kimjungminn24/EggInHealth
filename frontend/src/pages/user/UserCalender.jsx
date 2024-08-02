

const UserCalender = ()=>{
    const today = new Date()

    const formatMonth = `${today.getMonth()+1}`
    const formatYear = `${today.getFullYear()}`
    return(
        <div className="w-[313px] h-[620px] bg-white rounded-[20px] mt-[9px] m-auto overflow-hidden">
            <p className="w-full m-auto text-center py-[6px]">
                <span className="text-xl">{formatMonth} </span>
                <span className="text-sm">{formatYear}</span>
            </p>
            <hr />
            <div className="inline-flex flex-col items-center justify-start h-full w-full">
                <div className="flex flex-row items-center justify-start w-full text-center">
                    <p className="h-full text-sm font-medium text-gray-800 w-full">Mon</p>
                    <p className="h-full text-sm font-medium text-gray-800 w-full">Tue</p>
                    <p className="h-full text-sm font-medium text-gray-800 w-full">Wed</p>
                    <p className="h-full text-sm font-medium text-gray-800 w-full">Tur</p>
                    <p className="h-full text-sm font-medium text-gray-800 w-full">Fri</p>
                    <p className="h-full text-sm font-medium text-gray-800 w-full">Sat</p>
                    <p className="h-full text-sm font-medium text-gray-800 w-full">Sun</p>
                </div>
                <div className="flex flex-col items-start justify-start w-full">
                    <div className="flex items-center justify-start w-full">
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">01</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">02</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">03</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">04</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">05</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">06</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">07</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-start w-full">
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">01</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">02</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">03</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">04</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">05</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">06</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">07</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-start w-full">
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">01</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">02</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">03</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">04</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">05</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">06</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">07</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-start w-full">
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">01</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">02</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">03</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">04</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">05</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">06</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">07</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-start w-full">
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">01</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">02</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">03</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">04</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">05</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">06</p>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
                            <p className="text-sm font-medium text-gray-800">07</p>
                        </div>
                    </div>
                    {/* <div className="inline-flex items-center justify-start w-full h-full">
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="text-sm font-medium text-gray-800">08</p>
                        </div>
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="text-sm font-medium text-gray-800">09</p>
                        </div>
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="text-sm font-medium text-gray-800">10</p>
                        </div>
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="text-sm font-medium text-gray-800">11</p>
                        </div>
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="text-sm font-medium text-gray-800">12</p>
                        </div>
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="text-sm font-medium text-gray-800">13</p>
                        </div>
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="text-sm font-medium text-gray-800">14</p>
                        </div>
                    </div>
                    <div className="inline-flex items-center justify-start w-full h-full">
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="text-sm font-medium text-gray-800">15</p>
                        </div>
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="text-sm font-medium text-gray-800">16</p>
                        </div>
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="text-sm font-medium text-gray-800">17</p>
                        </div>
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="text-sm font-medium text-gray-800">18</p>
                        </div>
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="text-sm font-medium text-gray-800">19</p>
                        </div>
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="text-sm font-medium text-gray-800">20</p>
                        </div>
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="text-sm font-medium text-gray-800">21</p>
                        </div>
                    </div>
                    <div className="inline-flex items-center justify-start h-full w-full">
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="text-sm font-medium text-gray-800">22</p>
                        </div>
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="text-sm font-medium text-gray-800">23</p>
                        </div>
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="text-sm font-medium text-gray-800">24</p>
                        </div>
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="text-sm font-medium text-gray-800">25</p>
                        </div>
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="text-sm font-medium text-gray-800">26</p>
                        </div>
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="text-sm font-medium text-gray-800">27</p>
                        </div>
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="text-sm font-medium text-gray-800">28</p>
                        </div>
                    </div>
                    <div className="inline-flex items-center justify-start w-full h-full">
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="text-sm font-medium text-gray-800">29</p>
                        </div>
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="text-sm font-medium text-gray-800">30</p>
                        </div>
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="text-sm font-medium text-gray-800">31</p>
                        </div>
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="opacity-50 text-sm font-medium text-gray-800">01</p>
                        </div>
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="opacity-50 text-sm font-medium text-gray-800">02</p>
                        </div>
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="opacity-50 text-sm font-medium text-gray-800">03</p>
                        </div>
                        <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                            <p className="opacity-50 text-sm font-medium text-gray-800">04</p>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default UserCalender