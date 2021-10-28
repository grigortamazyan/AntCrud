import 'antd/dist/antd.css'
import './App.css';
import {Table, Button, Modal, Input} from 'antd'
import {useState} from 'react'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'

function App() {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState({ id: null, fullname: "", email: "", password: "" });
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: 'John',
      email: 'john@gmail.com',
      address: '123 Street, NYC'
    },
    {
      id: 2,
      name: 'Dave',
      email: 'dave@gmail.com',
      address: '123 Street, LA'
    },
    {
      id: 3,
      name: 'Tom',
      email: 'tom@gmail.com',
      address: '123 Street, Boston'
    },
    {
      id: 4,
      name: 'Ann',
      email: 'ann@gmail.com',
      address: '123 Street, Toronto'
    }
  ])

  const columns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: 'id'
    },
    {
      key: '2',
      title: 'Name',
      dataIndex: 'name'
    },
    {
      key: '3',
      title: 'Email',
      dataIndex: 'email'
    },
    {
      key: '4',
      title: 'Address',
      dataIndex: 'address'
    },
    {
      key: '5',
      title: 'Actions',
      render: (record)=>{
        return<>
          <EditOutlined onClick={()=>{
            onEditEmployee(record)
          }}/>
          <DeleteOutlined onClick={() =>{
            onDeleteEmployee(record)
          }} style={{color: "red", marginLeft: 12}}/>
        </>
      }
    }
  ]

  const onAddEmployee = () => {
    const randomNumber = parseInt(Math.random()*10000);
    const newEmployee = {
      id: randomNumber,
      name: "Name " + randomNumber,
      email: randomNumber + "@gmail.com",
      address: "Address " + randomNumber
    }
    setDataSource(pre => {
      return [...pre, newEmployee]
    })
  }
  const onDeleteEmployee = (record) => {
    Modal.confirm({
      title: 'Are you sure, you want to delete this employee?',
      okText: 'Yes',
      okType: 'danger',
      onOk:()=>{
        setDataSource(pre => {
          return pre.filter(employee => employee.id !== record.id)
        })
      }
    })
    
  }
  const onEditEmployee = (record) => {
    setIsEditing(true);
    setEditingEmployee({...record})
  }
  const resetEditing=()=>{
    setIsEditing(false);
    setEditingEmployee(null)
  }
  const handleChange = (event) => {
    const randomNumber = parseInt(Math.random()*10000);
    setUser({ ...user, id: randomNumber, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setDataSource(pre=> [...pre, user])
  };
  return (
    <>
      <div className="App">
      <header className="App-header">
        <Button onClick={onAddEmployee}>Generate a new Employee</Button>
        <Table 
          columns={columns}
          dataSource={dataSource}
        ></Table>
        <Modal
          title='Edit Employee'
          visible={isEditing}
          okText = 'Save'
          onCancel={() => {
            resetEditing()
          }}
          onOk = {() => {
            setDataSource(pre => {
              return pre.map(employee => {
                if(employee.id === editingEmployee.id){
                  return editingEmployee
                }else{
                  return employee
                }
              })
            })
            resetEditing()
          }
          } 
        >
          <Input value={editingEmployee?.name} onChange={(e)=>{
            setEditingEmployee(pre => {
              return {...pre, name:e.target.value}
            })
          }}/>
          <Input value={editingEmployee?.email} onChange={(e)=>{
            setEditingEmployee(pre => {
              return {...pre, email:e.target.value}
            })
          }}/>
          <Input value={editingEmployee?.address} onChange={(e)=>{
            setEditingEmployee(pre => {
              return {...pre, address:e.target.value}
            })
          }}/>
        </Modal>
        <div>
          <Modal
          title='Edit Employee'
          visible={isEditing}
          okText = 'Save'
          onOk={handleSubmit}
          >
            <input type="text" name="name" placeholder="Name" onChange={handleChange} />
            <input type="email" name="email" placeholder="email" onChange={handleChange} />
            <input type="text" name="address" placeholder="address" onChange={handleChange} />

          </Modal>
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" onChange={handleChange} />
      <input type="email" name="email" onChange={handleChange} />
      <input type="text" name="address" onChange={handleChange} />
      <button>Register new employee</button>
    </form>
    </div>
          </header>
        </div>
      
    </>
  );
}

export default App;
