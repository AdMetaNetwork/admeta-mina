import Base from "@/components/common/Base"

export default function Dashboard() {

  return (
    <Base page="dashboard">
      <div className="w-full h-[100vh] pt-[6rem]">
        <div className="text-[24px] text-r-medium mb-10">You Dashboard</div>
        <div className="mb-10 flex">
          <div className="inline-flex items-center mb-2 border-b border-primary-600 border-b-4 mr-10">
            <div>Total earning: </div>
            <div className="ml-2 text-[30px] text-primary-600 text-r-semi-bold">8.62</div>
          </div>
          <div className="inline-flex items-center mb-2 border-b border-primary-600 border-b-4 mr-10">
            <div>Completed ad tasks: </div>
            <div className="ml-2 text-[30px] text-primary-600 text-r-semi-bold">10</div>
          </div>
          <div className="inline-flex items-center mb-2 border-b border-primary-600 border-b-4 mr-10">
            <div>Earned NFT badges: </div>
            <div className="ml-2 text-[30px] text-primary-600 text-r-semi-bold">10</div>
          </div>
        </div>
        <div className="mb-10">
          <div className="text-[18px] mb-2">Your Personal Portrait</div>
          <div>graph</div>
        </div>
        <div>
          <div className="text-[18px] mb-2">Current Single Level</div>
          <div className="flex items-center mb-4">
            <div className="w-[80px] text-r-medium">DeFi:</div>
            <div className="w-[500px] flex mr-4">
              <div className="w-[30%] h-[4px] bg-primary-600"></div>
              <div className="w-[70%] h-[4px] bg-gray-300"></div>
            </div>
            <div className="text-r-medium">30%</div>
            <div className="ml-2 text-[20px] text-primary-600 text-r-medium">Lv.5</div>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-[80px] text-r-medium">GameFi:</div>
            <div className="w-[500px] flex mr-4">
              <div className="w-[20%] h-[4px] bg-primary-600"></div>
              <div className="w-[80%] h-[4px] bg-gray-300"></div>
            </div>
            <div className="text-r-medium">30%</div>
            <div className="ml-2 text-[20px] text-primary-600 text-r-medium">Lv.4</div>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-[80px] text-r-medium">AI:</div>
            <div className="w-[500px] flex mr-4">
              <div className="w-[15%] h-[4px] bg-primary-600"></div>
              <div className="w-[85%] h-[4px] bg-gray-300"></div>
            </div>
            <div className="text-r-medium">30%</div>
            <div className="ml-2 text-[20px] text-primary-600 text-r-medium">Lv.5</div>
          </div>
        </div>
      </div>
    </Base>
  )
}
