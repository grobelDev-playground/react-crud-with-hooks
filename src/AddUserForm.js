import React, { useState } from 'react'

const AddUserForm = props => {

  // FORM INITIALIZER: - Gives a blank slate for empty fields.
  const initialFormState = { id: null, name: '', username: '' }

  // ADDUSERFORM STATE: - This represents the state for this specific form.
  // We beam up any relevant information for App.js by using props.
  const [user, setUser] = useState(initialFormState)

  // INPUT HANDLER: - This gets called whenever an input is recorded in the form.
  const handleInputChange = event => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        if (!user.name || !user.username) return

        props.addUser(user)
        setUser(initialFormState)
      }}
    >
      <label>Name</label>
      <input type="text" name="name" value={user.name} onChange={handleInputChange} />
      <label>Username</label>
      <input type="text" name="username" value={user.username} onChange={handleInputChange} />
      <button>Add new user</button>

    </form>
  )
}

export default AddUserForm
