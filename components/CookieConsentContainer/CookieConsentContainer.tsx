import Button from '@components/Button'
import { Modal, Accordion, Paper, Switch } from '@mantine/core'
import Link from 'next/link'

const CookieConsentContainer = ({
  checked,
  opened,
  setChecked,
  setOpened,
}: {
  checked: boolean
  opened: boolean
  setChecked: React.Dispatch<React.SetStateAction<boolean>>
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <Modal
      overlayColor="rgba(0, 0, 0, 0.5)"
      overlayOpacity={0.55}
      overlayBlur={3}
      size="lg"
      opened={opened}
      onClose={() => setOpened(false)}
      title="Cookie Settings"
      centered
    >
      <section className="space-y-2 border-t border-gray-200 py-4">
        <h1 className="font-semibold text-gray-900">Cookie Usage</h1>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam quis exercitation.{' '}
          <Link href={'/privacy-policy'}>
            <a
              className="text-gray-900 underline"
              onClick={() => setOpened(false)}
            >
              Privacy Policy
            </a>
          </Link>
        </p>
        <Accordion multiple>
          <Accordion.Item
            label="Strictly necessary cookies"
            className="bg-gray-50"
          >
            <div className="flex justify-between gap-4 text-justify">
              <p>
                These cookies are essential for the proper functioning of my
                website. Without these cookies, the website would not work
                properly
              </p>
              <Switch
                disabled={true}
                size="lg"
                onLabel="ON"
                offLabel="OFF"
                checked={true}
                color="green"
              />
            </div>
          </Accordion.Item>
          <Accordion.Item
            label="Performance and analytics cookies"
            className=" bg-gray-50"
          >
            <div className="flex justify-between gap-4 text-justify">
              <p>
                These cookies collect information about how you use the website,
                which pages you visited and which links you clicked on. All of
                the data is anonymized and cannot be used to identify you
              </p>
              <Switch
                onLabel="ON"
                offLabel="OFF"
                checked={checked}
                onChange={(event) => setChecked(event.currentTarget.checked)}
                size="lg"
                color="green"
              />
            </div>
          </Accordion.Item>
        </Accordion>
        <Paper className="py-4">
          <p className="text-gray-700">
            For more information about cookies and your choices, please visit
            our{' '}
          </p>
          <Link href={'/cookie-policy'}>
            <a
              className="text-gray-900 underline"
              onClick={() => setOpened(false)}
            >
              Cookie Policy
            </a>
          </Link>
        </Paper>
        <Paper className="flex w-full items-center justify-between border-t border-gray-200 pt-4">
          <div className="flex items-center gap-2">
            <Button type="button" color="dark">
              Accept all
            </Button>
            <Button type="button" color="gray">
              Reject all
            </Button>
          </div>
          <Button type="button" color="gray">
            Confirm Choices
          </Button>
        </Paper>
      </section>
    </Modal>
  )
}

export default CookieConsentContainer
