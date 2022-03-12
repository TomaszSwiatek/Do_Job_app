import Avatar from '../../components/Avatar'
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'


function ProjectSummary({ project }) {
    const { deleteDocument } = useFirestore('projects')
    const handleClick = () => {
        deleteDocument(project.id)
        navigate('/')

    }
    const { user } = useAuthContext()
    const navigate = useNavigate();
    return (
        <div>
            <div className='project-summary'>
                <h2 className="page-title">{project.name}</h2>
                <p>By {project.createdBy.displayName}</p>
                <p className="due-date">
                    Project due by{project.dueDate.toDate().toDateString()}
                </p>
                <p className="details">
                    {project.details}
                </p>
                <h4>Project is assigned to:</h4>
                <div className="assigned-users">
                    {project.assignedUsersList.map(user => (
                        <div key={user.photoURL} >
                            <Avatar src={user.photoURL} />
                        </div>
                    ))}
                </div>
            </div >
            {
                project.createdBy.id === user.uid && <button
                    className="btn"
                    onClick={handleClick}>Mark as Complete</button>
            }
        </div>
    )
}

export default ProjectSummary
