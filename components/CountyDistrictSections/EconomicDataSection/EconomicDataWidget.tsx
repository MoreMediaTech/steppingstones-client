import { BiEdit } from 'react-icons/bi'
import { MdOutlineDelete } from 'react-icons/md'
import { EconomicDataWidgetProps } from '@lib/types'
import { useDeleteEconomicDataWidgetByIdMutation } from 'features/editor/editorApiSlice'
import { Button } from '@mantine/core'

const EconomicDataWidget = ({
  economicData,
  setOpened,
  type,
  setEconomicData,
  setType,
  refetch,
}: {
  economicData: EconomicDataWidgetProps
  type: 'create' | 'edit'
  setType: React.Dispatch<React.SetStateAction<'create' | 'edit'>>
  setEconomicData: React.Dispatch<
    React.SetStateAction<EconomicDataWidgetProps | undefined>
  >
  refetch: () => void
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [deleteEconomicDataWidgetById, { isLoading }] =
    useDeleteEconomicDataWidgetByIdMutation()
  return (
    <div className="flex flex-col space-y-2 bg-white p-2 rounded-lg shadow-lg">
      <div className="relative">
        <div className=" w-full rounded-2xl border border-[#3A0B99] bg-[#3A0B99] shadow-lg ">
          <div className="flex flex-col items-center justify-center  space-y-8 p-4 text-sm font-semibold text-center text-white md:text-base lg:text-lg">
            <h1>{economicData?.title}</h1>
            <p>
              {`${economicData?.stats}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </p>
            <div className="text-center">
              <p>{economicData?.descriptionLine1}</p>
              <p>{economicData?.descriptionLine2}</p>
            </div>
            <a href={economicData?.linkUrl} target="_">
              {economicData?.linkName}
            </a>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          leftIcon={<BiEdit fontSize={20} />}
          className="hover:bg-blue-500 hover:text-white"
          onClick={() => {
            setOpened(true)
            setType('edit')
            setEconomicData(economicData)
          }}
        >
          Edit
        </Button>
        <Button
          type="button"
          variant="outline"
          color="red"
          className="hover:bg-red-500 hover:text-white"
          leftIcon={<MdOutlineDelete fontSize={20} />}
          onClick={async () => {
            await deleteEconomicDataWidgetById(economicData.id).unwrap()
            refetch()
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default EconomicDataWidget
