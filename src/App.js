import React, { useState } from 'react'
import UserTable from './tables/UserTable'
import AddUserForm from './AddUserForm.js'
import EditUserForm from './EditUserForm'

export default function App() {

  // NOTES MISC:
  // All functions that change the model are defined here.
  // The state values for this App are then sent as props to other places.
  // So, this is the 'Controller' that determines what is seen.


  // SAMPLE DATA
  const usersData = [
    { id: 1, name: 'Tania', username: 'floppydiskette' },
    { id: 2, name: 'Craig', username: 'siliconeidolon' },
    { id: 3, name: 'Ben', username: 'benisphere' },
  ]

  // THE MODEL: - User State - An array of data representing the users.
  // Changes here will result in re-rendering everything.
  const [users, setUsers] = useState(usersData)

  // ADDING: - Adding a single user to our state (users) means adding to a copy.
  const addUser = user => {
    user.id = users.length + 1
    setUsers([...users, user])
  }

  // DELETING: - Deleting a user means setting our state (users) to a copy without the required value.
  const deleteUser = id => {
    setEditing(false)
    setUsers(users.filter(user => user.id !== id))
  }

  // EDITING:
  // We use a separate form for the editing UI, so we need state variables
  // to check if we're currently editing or not. Also, we need some initializers.

  // INITIALIZER: - Empty out the form. Convenient to use after an input is recorded.
  const initialFormState = { id: null, name: '', username: '' }

  // EDITING TRACKER: - Tracks whether or not we are currently editing.
  const [editing, setEditing] = useState(false)

  // SELECTION TRACKER: - Tracks the current user we are editing.
  const [currentUser, setCurrentUser] = useState(initialFormState)

  // BEGIN EDITING: - We use this function? when we start editing.
  // It's not just a call to 'setEditing()' because we want to init the fields.
  const editRow = user => {
    setEditing(true)
    setCurrentUser({ id: user.id, name: user.name, username: user.username })
  }

  // FINISH EDITING: - We use this when saving edits.
  // 1. setEditing() should now be false.
  // 2. We REPLACE the user we have completed editing for with our updatedUser.
  //    Else, just keep the users we had before.
  const updateUser = (id, updatedUser) => {
    setEditing(false)
    setUsers(users.map(user => (user.id === id ? updatedUser : user)))
  }

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {/* Ternary logic (editing is a state variable passed into EditUserForm)
              was used here to determine what gets shown.
              As this div gets rerendered on every state change, a conditional is effectively
              a '.hidden' property for a div. */}
          {editing ? (
            <div>
              <h2>Edit user</h2>
              {/* Here, we are sending our earlier state values (editing, setEditing, etc.) INTO the form. 
                  As an example, we send the READ-ONLY value of 'editing', and ALSO
                  the means for changing that value with our state function 'setEditing'.
                  
                  Accessing those values is as simple as using 'props.editing'
                  when within EditUserForm.js.
              */}
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
              <div>
                <h2>Add user</h2>
                <AddUserForm addUser={addUser} />
              </div>
            )}
        </div>

        {/* This is where the rows are represented, 
        so most of the functions changing the model are here. */}
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser}></UserTable>
        </div>
      </div>
    </div>
  )
}