import { UserProfile } from "@clerk/remix";
import { Form, useNavigation } from "@remix-run/react";
import {
  Button,
  Label,
  Modal,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import React from "react";
import { modalTheme } from "~/theme/flowbite";
import { useProfileStore } from "~/utils/store";

export const ModalProfiles = ({
  openModal,
  setOpenModal,
}: {
  openModal: string | undefined;
  setOpenModal: any;
}) => {
  return (
    <Modal
      theme={modalTheme}
      dismissible
      show={openModal === "dismissible"}
      onClose={() => setOpenModal(undefined)}
      size="5xl"
    >
      <Modal.Body className="p-5 w-full">
        <UserProfile />
      </Modal.Body>
    </Modal>
  );
};

export const ModalProfiles2 = ({
  openModal,
  setOpenModal,
}: {
  openModal: string | undefined;
  setOpenModal: any;
}) => {
  const [edit, setEdit] = React.useState(false);
  const { profile } = useProfileStore();
  const { state } = useNavigation();
  let isAdding = state === "submitting";
  let formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (!isAdding) {
      formRef.current?.reset();
      setEdit(false);
    }
  }, [isAdding]);

  return (
    <Modal
      dismissible
      show={openModal === "dismissible"}
      onClose={() => setOpenModal(undefined)}
    >
      <Form method="post" ref={formRef}>
        <Modal.Header>User Profiles</Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-8">
            <div className="col-span-2 flex justify-center">
              <img
                src={profile.imgUrl || ""}
                className="w-24 h-24 rounded-full"
              />
            </div>
            <input
              type="hidden"
              name="imgurl"
              defaultValue={profile.imgUrl || ""}
            />
            <div className="col-span-6">
              <div className="flex max-w-md flex-col gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <TextInput
                  className="font-semibold"
                  color={edit ? "warning" : "info"}
                  readOnly={edit ? false : true}
                  id="fullName"
                  name="fullName"
                  placeholder="Disabled input"
                  defaultValue={profile.fullName || ""}
                  type="text"
                />
                <Label htmlFor="userName">User Name</Label>
                <TextInput
                  className="font-semibold"
                  color={edit ? "warning" : "info"}
                  readOnly={edit ? false : true}
                  id="userName"
                  name="username"
                  placeholder="Disabled input"
                  defaultValue={profile.userName}
                  type="text"
                />
                <Label htmlFor="email">Email</Label>
                <TextInput
                  className="font-semibold"
                  color={edit ? "warning" : "info"}
                  readOnly={edit ? false : true}
                  id="email"
                  name="email"
                  placeholder="Disabled input"
                  defaultValue={profile.email}
                  type="text"
                />
                <Label htmlFor="about">About</Label>
                <Textarea
                  className="font-semibold"
                  color={edit ? "warning" : "info"}
                  readOnly={edit ? false : true}
                  placeholder="Disabled input"
                  name="about"
                  defaultValue={
                    profile.about ??
                    "Add your description, like 'I want to be The next Elon Musk 😜'"
                  }
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => (edit ? setEdit(false) : setEdit(true))}>
            {!edit ? "Edit" : "Cancel"}
          </Button>
          {edit && (
            <Button type="submit" color="warning" name="intent" value="create">
              Save
            </Button>
          )}

          <Button color="gray" onClick={() => setOpenModal(undefined)}>
            Close
          </Button>
          {isAdding && <Spinner aria-label="Default status example" />}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
