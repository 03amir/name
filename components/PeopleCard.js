import React,{useState} from 'react';
import { Box, Checkbox, Flex, Text, IconButton, Input,Spacer } from '@chakra-ui/react';
import { DeleteIcon, EditIcon, CheckIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { saveEditedUser, deleteUser, selectRow } from '../utils/tableSlice';

function PeopleCard({user}) {

    const dispatch = useDispatch();


        const { id, name: initialName, email: initialEmail, role: initialRole} = user;

        const selectedRows = useSelector((state)=>state.table.selectedRows);
        

        const [isEditing, setIsEditing] = useState(false);

        const [name, setName] = useState(initialName);
        const [email, setEmail] = useState(initialEmail);
        const [role, setRole] = useState(initialRole);

        const handleEditToggle = () => {
            setIsEditing(!isEditing);
        };

        const handleSave = () => {
            dispatch(saveEditedUser({id,name,email,role}));
            setIsEditing(false);
        };

        const handleDelete = ()=>{
            dispatch(deleteUser(id));
            console.log("deleted")
        }

    const handleRowSelect = (isChecked) => {
        dispatch(selectRow({id, isChecked}));
    };


        return (
            <Flex align="center" justify="space-between" p={4} borderWidth="1px" borderRadius="md" mb={4}>

                <Checkbox isChecked={selectedRows?.includes(id)} onChange={(e) => handleRowSelect(e.target.checked)} />
                
                {isEditing ? (
                    <>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input value={role} onChange={(e) => setRole(e.target.value)} />
                    </>
                ) : (
                    <>
                        <Text fontWeight="bold" ml={2}>{name}</Text>
                        <Text ml={2}>{email}</Text>
                        <Text ml={2}>{role}</Text>
                    </>
                )}
                <Flex align="center" justify="space-between" p={2} borderWidth="1px" borderRadius="md" mb={2}>
                    <IconButton
                        icon={isEditing ? <CheckIcon /> : <EditIcon />}
                        colorScheme={isEditing ? 'green' : 'blue'}
                        aria-label={isEditing ? 'Save changes' : 'Edit user'}
                        onClick={isEditing ? handleSave : handleEditToggle}
                        mr={2}
                    />
                    <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        aria-label="Delete user"
                    onClick={handleDelete}
                    />
                </Flex>
                
            </Flex>
        );
    };



export default PeopleCard;