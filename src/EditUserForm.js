import React, { useState, useEffect } from 'react'

const EditUserForm = props => {
  // FORM STATE: - Although this state is also called 'user', this is the state
  //               SPECIFICALLY for this form. 
  // If we wanted the state from App.js we can just use 'props.user'.
  const [user, setUser] = useState(props.currentUser)

  // USEEFFECT: - This lets EditUserForm know that the props (from App.js) have changed.
  // The '[props]' argument lets us know that we are looking for changes in 'props'.
  useEffect(() => {
    setUser(props.currentUser)
  }, [props])


  // FORM INPUT: - Any time something is put into the form, this gets called.
  // We update the state for EditUserForm.
  const handleInputChange = event => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        // Stops the page from reloading.
        event.preventDefault()
        // Send the result back to App.js.
        props.updateUser(user.id, user)
      }}
    >
      <label>Name</label>
      <input type="text" name="name" value={user.name} onChange={handleInputChange} />
      <label>Username</label>
      <input type="text" name="username" value={user.username} onChange={handleInputChange} />
      <button>Update user</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

export default EditUserForm
