import React,{useState,useEffect} from 'react';
import { Input,  Image, IconButton, Checkbox,Flex,Box, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { fetchDataSuccess } from '../utils/tableSlice';
import { useDispatch, useSelector } from 'react-redux';
import {API_URL} from '../constant';
import axios from 'axios';
import PeopleCard from './PeopleCard';
import {  searchUser, selectAllRows, deleteSelectedRows } from '../utils/tableSlice';
import noData from '../assets/noData.png';
import PaginationButtons from './PaginationButtons';

function Board() {

    const dispatch = useDispatch();

    const { data, currentPage, selectAll, totalPages, selectedRows } = useSelector((state) => state.table);

    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    const pageData = data.slice(startIndex, endIndex);

    const [searchValue, setSearchValue] = useState('');

    const handleSelectAll = () => {
        dispatch(selectAllRows());
    };

    const handleDeleteSelected = () => {
        dispatch(deleteSelectedRows());
    };

    const handleSearchChange = (e) => {

        const value = e.target.value;
        setSearchValue(value);
 
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            dispatch(searchUser(searchValue));
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(API_URL);
            const responseData = response.data;
            
            dispatch(fetchDataSuccess(responseData));

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [dispatch]);


    return (
        <div>

           
            <Flex align="center" style={{width:"50vw"}}>

                <Input
                    type="text"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchKeyDown} 
                    borderRadius=""
                    mr="2"
                />

                <IconButton
                    onClick={handleDeleteSelected}
                    isDisabled={selectedRows.length==0}
                    colorScheme="red"
                    icon={<DeleteIcon />}
                 
                />
            </Flex>

            <Flex justify="space-between" p={4} pr={8} borderWidth="1px" borderRadius="md" mb={4}>

                <Checkbox isChecked={selectAll} onChange={handleSelectAll} />

                <Text fontWeight="bold" ml={2}>
                    Name
                </Text>
                <Text fontWeight="bold" ml={4}>
                    Email
                </Text>
                <Text fontWeight="bold" ml={4}>
                    Role
                </Text>
                <Text fontWeight="bold" ml={4}>
                    Actions
                </Text>
            </Flex>


            {
                pageData?.length > 0 ? (
                    pageData.map((item) => (
                        <PeopleCard key={item.id} user={item} />
                    ))
                ) : (
                    <Box textAlign="center" marginTop="20px">
                       
                            <Image src={noData} alt="No data image" boxSize="400px" margin="auto" />
                       
                    </Box>
                )
            }

            <PaginationButtons currentPage={currentPage} totalPages={totalPages}/>
 
        </div>
    );
}

export default Board;