import { useState } from "react"
import Button from "../../ui/Button"
import NewCabinForm from "./NewCabinForm"
import Modal from "../../ui/Modal"

function AddCabin() {
  const [showForm, setIsOpenModal] = useState(false)

  return (
    <div>
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        Add new cabin
      </Button>

      {showForm && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <NewCabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  )
}

export default AddCabin
