import { useState } from "react"
import CabinTable from "../features/cabins/CabinTable"
import Heading from "../ui/Heading"
import Row from "../ui/Row"
import Button from "../ui/Button"
import NewCabinForm from "../features/cabins/NewCabinForm"

function Cabins() {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />
      </Row>

      <Button onClick={() => setShowForm((show) => !show)}>
        Add new cabin
      </Button>
      {showForm && <NewCabinForm />}
    </>
  )
}

export default Cabins
