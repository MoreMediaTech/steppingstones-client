import { EconomicDataProps } from "@lib/types";

const EconomicDataPreview = ({ economicData }: {economicData: EconomicDataProps}) => {
  return (
    <div className="grid w-full  grid-cols-3 gap-4 text-xl">
      <div className="border border-gray-900 text-gray-500">
        <div className="h-16 border-b border-gray-900 bg-blue-500 text-center text-white">
          <h3>Housing:</h3>
          <p>{`(Average Cost)`}</p>
        </div>
        <div className="flex h-28 flex-col items-center justify-center border-b border-gray-900 bg-green-500  px-4 py-6 text-center text-white">
          <p>{economicData?.averageHousingCost}</p>
          <p>66% Lower than national average</p>
        </div>
        <div className="flex h-12 flex-col items-center justify-center bg-gray-300 text-center text-sm">
          <p>
            ** Data from <span className="text-green-700">Varbes</span> Apr-2022
          </p>
        </div>
      </div>
      <div className="border border-gray-900 text-gray-500">
        <div className="h-16 border-b border-gray-900 bg-blue-500 text-center text-white">
          <h3>Wages:</h3>
          <p>{`(Average Earnings)`}</p>
        </div>
        <div className="flex h-28 flex-col items-center justify-center border-b border-gray-900 bg-green-500  text-center text-white">
          <p>£{economicData?.averageWageEarnings}</p>
          <p>9% Lower than national average</p>
        </div>
        <div className="flex h-12 flex-col items-center justify-center bg-gray-300 text-center text-sm">
          <p>
            ** Data from <span className="text-green-700">NOMIS</span> Apr-2022
          </p>
        </div>
      </div>
      <div className="border border-gray-900 text-gray-500">
        <div className="h-16 border-b border-gray-900 bg-blue-500 text-center text-white">
          <h3>Working Age Population:</h3>
        </div>
        <div className="flex h-28 flex-col items-center justify-center border-b border-gray-900 bg-green-500 text-center text-white">
          <p> {economicData?.workingAgePopulation}</p>
          <p>Males = </p>
          <p>Females = </p>
        </div>
        <div className="flex h-12 flex-col items-center justify-center bg-gray-300 text-center text-sm">
          <p>
            ** Data from <span className="text-green-700">NOMIS</span> Apr-2022
          </p>
        </div>
      </div>
      <div className="border border-gray-900 text-gray-500">
        <div className="h-16 border-b border-gray-900 bg-blue-500 text-center text-white">
          <h3>Labour Demand:</h3>
        </div>
        <div className="flex h-28 flex-col items-center justify-center border-b border-gray-900 bg-green-500 text-center text-white">
          <p> {economicData?.labourDemand}</p>
          <p>Job Density</p>
          <p>Job Per Resident {`(WAP)`}</p>
        </div>
        <div className="flex h-12 flex-col items-center justify-center bg-gray-300 text-center text-sm">
          <p>
            ** Data from <span className="text-green-700">NOMIS</span> Apr-2022
          </p>
        </div>
      </div>
      <div className="border border-gray-900 text-gray-500">
        <div className="h-16 border-b border-gray-900 bg-blue-500 text-center text-white">
          <h3>Companies House</h3>
          <p>Registered Businesses</p>
        </div>
        <div className="flex h-28 flex-col items-center justify-center border-b border-gray-900 bg-green-500  px-4 py-6 text-center text-white">
          <p>{economicData?.numOfRegisteredCompanies}</p>
        </div>
        <div className="flex h-12 flex-col items-center justify-center bg-gray-300 text-center text-sm">
          <p>
            ** Data from <span className="text-green-700">FAME</span> Apr-2022
          </p>
        </div>
      </div>
      <div className="border border-gray-900 text-gray-500">
        <div className="h-16 border-b border-gray-900 bg-blue-500 text-center text-white">
          <h3>Business Parks:</h3>
          <p>{`(Main Sites Only)`}</p>
        </div>
        <div className="flex h-28 flex-col items-center justify-center border-b border-gray-900 bg-green-500  px-4 py-6 text-center text-white">
          <p> {economicData?.numOfBusinessParks}</p>
        </div>
        <div className="flex h-12 flex-col items-center justify-center bg-gray-300 text-center text-sm">
          <p>** Data from Observation in District Apr-2022</p>
        </div>
      </div>
      <div className="border border-gray-900 text-gray-500">
        <div className="h-16 border-b border-gray-900 bg-blue-500 text-center text-white">
          <h3>Unemployment</h3>
        </div>
        <div className="flex h-28 flex-col items-center justify-center border-b border-gray-900 bg-green-500  px-4 py-6 text-center text-white">
          <p> {economicData?.unemploymentRate}</p>
          <p>4.05% of WAP</p>
        </div>
        <div className="flex h-12 items-center justify-center bg-gray-300 text-center text-sm">
          ** Data from <span className="text-green-700">NCC</span> Apr-2022
        </div>
      </div>
      <div className="text-gray-500">
        Employment Investment Land:{' '}
        <span className="text-gray-900">
          {' '}
          {economicData?.employmentInvestmentLand}
        </span>{' '}
      </div>

      <div className="text-gray-500">
        Number of Retail Shops:{' '}
        <span className="text-gray-900">{economicData?.noOfRetailShops}</span>{' '}
      </div>
    </div>
  )
}

export default EconomicDataPreview;