import Button from "../../ui/Button"
import NewCabinForm from "./NewCabinForm"
import Modal from "../../ui/Modal"

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <NewCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  )
}

export default AddCabin
