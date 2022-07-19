import Button from '@components/Button'
import { Modal, Accordion, Paper, Switch } from '@mantine/core'
import Link from 'next/link'

const CookieConsentContainer = ({
  snCookies,
  opened,
  setSNCookies,
  setOpened,
  handleAccept,
  handleConfirmChoices,
}: {
  snCookies: boolean
  opened: boolean
  setSNCookies: React.Dispatch<React.SetStateAction<boolean>>
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
  handleAccept: () => void
  handleConfirmChoices: () => void
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
        <p className="text-sm text-gray-700 md:text-lg">
          We use cookies to store or retrieve information on your browser. This
          information may relate to you, your preferences, or your device and is
          mostly used to make the site work as you expect it to. Because we
          respect your right to privacy, you can choose not to allow some types
          of cookies. Click on the different category headings to find out more
          and change your settings. However, blocking some types of cookies may
          impact your experience of the site and the services we are able to
          offer.{' '}
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
            label={
              <p className="text-sm md:text-lg">Strictly necessary cookies</p>
            }
            className="bg-gray-50"
          >
            <div className="flex justify-between gap-4 text-justify">
              <p className="text-sm font-thin md:text-base">
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
            label={
              <p className="text-sm md:text-lg">
                Performance and analytics cookies
              </p>
            }
            className=" bg-gray-50"
          >
            <div className="flex justify-between gap-4 text-justify">
              <p className="text-sm font-thin md:text-base">
                These cookies collect information about how you use the website,
                which pages you visited and which links you clicked on. All of
                the data is anonymized and cannot be used to identify you
              </p>
              <Switch
                onLabel="ON"
                offLabel="OFF"
                checked={snCookies}
                onChange={(event) => setSNCookies(event.currentTarget.checked)}
                size="lg"
                color="green"
              />
            </div>
          </Accordion.Item>
        </Accordion>
        <Paper className="py-4 px-2 hover:bg-gray-50">
          <p className="text-sm text-gray-700 md:text-lg">
            For more information about cookies and your choices, please visit
            our{' '}
          </p>
          <Link href={'/cookie-policy'}>
            <a
              className="text-sm text-gray-900 underline md:text-lg"
              onClick={() => setOpened(false)}
            >
              Cookie Policy
            </a>
          </Link>
        </Paper>
        <Paper className="flex w-full flex-col items-center justify-between gap-2 border-t border-gray-200 pt-4 md:flex-row md:gap-16">
          <Button
            type="button"
            color="dark"
            className="w-full md:w-1/3"
            onClick={handleAccept}
          >
            Accept all
          </Button>

          <Button
            type="button"
            color="gray"
            className="w-full text-xs md:w-1/3 md:text-lg"
            onClick={handleConfirmChoices}
          >
            Confirm Choices
          </Button>
        </Paper>
      </section>
    </Modal>
  )
}

export default CookieConsentContainer
