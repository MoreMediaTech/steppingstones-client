// components
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";

// hooks (Controller)
import useNotificationsController from "./use-notifications-controller";

export function SendNotificationForm() {
  const {
    form,
    handleSendNotificationsToAllUsers,
    isSendingToAllUsers,
    notificationType,
  } = useNotificationsController();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSendNotificationsToAllUsers)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a title" {...field} />
              </FormControl>
              <FormDescription>
                The title of the notification you want to send
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message Type</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value)}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Message type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {notificationType?.map((type, index) => {
                    return (
                      <SelectItem key={`${index} + ${type}`} value={type}>
                        {type}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormDescription>
                This is the type of notification you want to send.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message body</FormLabel>
              <FormControl>
                <Textarea placeholder="Write a message" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isSendingToAllUsers} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export function SendNotificationFormToUser() {
  const {
    form,
    handleSendNotificationsToUser,
    isSendingToUser,
    notificationType,
    userNames,
  } = useNotificationsController();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSendNotificationsToUser)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a title" {...field} />
              </FormControl>
              <FormDescription>
                The title of the notification you want to send
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message Type</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value)}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Message type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {notificationType?.map((type, index) => {
                    return (
                      <SelectItem key={`${index} + ${type}`} value={type}>
                        {type}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormDescription>
                This is the type of notification you want to send.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message Type</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value)}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a User" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {userNames?.map((type, index) => {
                    return (
                      <SelectItem
                        key={`${index} + ${type.id}`}
                        value={type.id as string}
                      >
                        {type.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormDescription>
                This is the type of notification you want to send.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message body</FormLabel>
              <FormControl>
                <Textarea placeholder="Write a message" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isSendingToUser} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
