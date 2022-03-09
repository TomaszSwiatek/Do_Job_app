// styles
import './Create.css'
import { useEffect, useState } from 'react'
import Select from 'react-select' //additional package
import { useCollection } from '../../hooks/useCollection'

const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' }
]



export default function Create() {
    const { documents } = useCollection('users')
    const [users, setUsers] = useState([])

    // form field values
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])
    const [formError, setFormError] = useState(null)

    // fetching and creating users array of objects to use in select visible component to assignedUsers to project
    useEffect(() => {
        if (documents) {
            const options = documents.map(user => {
                return {
                    value: user,
                    label: user.displayName
                }
            })
            setUsers(options)
        }
    }, [documents])

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError(null) //reset error state

        if (!category) {
            setFormError('Choose a project category')
            return //becouse we want to end work of interpreter here
        }
        if (assignedUsers.length < 1) {
            setFormError('Please assign the project to at least 1 user')
            return
        }



        console.log(name, details, dueDate, category.value, assignedUsers)

    }


    return (
        <div className='create-form'>
            <h2 className='page-title'>Create a new project</h2>
            <form onSubmit={handleSubmit} >
                <label>
                    <span>Project name:</span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Project details:</span>
                    <textarea
                        required
                        type="text"
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                    />
                </label>
                <label>
                    <span>Set due date:</span>
                    <input
                        required
                        type="date"
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                    />
                </label>
                <label>
                    <span>Project category:</span>
                    <Select
                        onChange={(option) => setCategory(option)}
                        options={categories}
                    />
                </label>
                <label>
                    <span>Assign to:</span>
                    < Select
                        options={users}
                        onChange={(option => setAssignedUsers(option))}
                        isMulti
                    />
                </label>
                <button className='btn'>Add Project</button>
                {formError && <p className='error'>{formError}</p>}
            </form>
        </div>
    );
}
