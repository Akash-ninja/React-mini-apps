import Button from "../../ui/Button"
import NewCabinForm from "./NewCabinForm"
import CabinTable from "./CabinTable"
import Modal from "../../ui/Modal"

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens='cabin-form'>
        <Button>Add new Cabin</Button>
      </Modal.Open>
      <Modal.Window name='cabin-form'>
        <NewCabinForm />
      </Modal.Window>

      <Modal.Open opens='table'>
        <Button>Show Table</Button>
      </Modal.Open>
      <Modal.Window name='table'>
        <CabinTable />
      </Modal.Window>
    </Modal>
  )
}

export default AddCabin
