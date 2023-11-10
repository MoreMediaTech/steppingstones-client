"use client";
import { Button } from "@components/ui/button";
import { Switch } from "@components/ui/switch";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { Label } from "@components/ui/label";

const CookieConsentContainer = ({
  snCookies,
  setSNCookies,
  handleAccept,
  handleConfirmChoices,
}: {
  snCookies: boolean;
  setSNCookies: React.Dispatch<React.SetStateAction<boolean>>;
  handleAccept: () => void;
  handleConfirmChoices: () => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className=" border-primary underline">
          Manage Preferences
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cookie Usage</DialogTitle>
          <DialogDescription>
            We use cookies to store or retrieve information on your browser.
            This information may relate to you, your preferences, or your device
            and is mostly used to make the site work as you expect it to.
            Because we respect your right to privacy, you can choose not to
            allow some types of cookies. Click on the different category
            headings to find out more and change your settings. However,
            blocking some types of cookies may impact your experience of the
            site and the services we are able to offer.{" "}
            <DialogTrigger asChild>
              <Link
                href={"/privacy-policy"}
                className="text-gray-900 underline"
              >
                Privacy Policy
              </Link>
            </DialogTrigger>
          </DialogDescription>
        </DialogHeader>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Strictly necessary cookies</AccordionTrigger>
            <AccordionContent>
              <div className="flex justify-between gap-4 text-justify">
                <p className="text-sm font-thin md:text-base">
                  These cookies are essential for the proper functioning of my
                  website. Without these cookies, the website would not work
                  properly
                </p>
                <div className="flex items-center gap-2">
                  <Label htmlFor="snCookies">Off</Label>
                  <Switch disabled id="snCookies" checked={true} color="gray" />
                  <Label htmlFor="snCookies">On</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="-item-2">
            <AccordionTrigger>
              Performance and analytics cookies
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex justify-between gap-4 text-justify">
                <p className="text-sm font-thin md:text-base">
                  These cookies collect information about how you use the
                  website, which pages you visited and which links you clicked
                  on. All of the data is anonymized and cannot be used to
                  identify you
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="snCookies">Off</Label>
                <Switch
                  id="snCookies"
                  checked={snCookies}
                  onCheckedChange={(event) => setSNCookies(event)}
                  color={`snCookies ? 'green' : 'gray'`}
                />
                <Label htmlFor="snCookies">On</Label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <section className="space-y-2 border-t border-primary py-4">
          <div className="px-2 py-4 ">
            <p className="text-sm md:text-lg">
              For more information about cookies and your choices, please visit
              our{" "}
            </p>
            <DialogTrigger asChild>
              <Link
                href={"/cookie-policy"}
                className="text-sm underline md:text-lg"
              >
                Cookie Policy
              </Link>
            </DialogTrigger>
          </div>
          <div className="flex w-full flex-col items-center justify-between gap-2 border-t border-gray-200 pt-4 md:flex-row md:gap-16">
            <DialogTrigger asChild>
              <Button
                type="button"
                className="w-full md:w-1/3"
                onClick={handleAccept}
              >
                Accept all
              </Button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <Button
                type="button"
                className="w-full text-xs md:w-1/3 md:text-sm"
                onClick={handleConfirmChoices}
              >
                Confirm Choices
              </Button>
            </DialogTrigger>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default CookieConsentContainer;
