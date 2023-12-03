import React from 'react';
import { HStack, Button, Box, Text, Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { pageChange } from '../utils/tableSlice';
import {
    ChevronLeftIcon,
    ArrowLeftIcon,
    ChevronRightIcon,
    ArrowRightIcon
} from '@chakra-ui/icons';

function PaginationButtons({ currentPage, totalPages }) {
    const selectedRows = useSelector((state) => state.table.selectedRows);
    const data = useSelector((state) => state.table.data);

    const dispatch = useDispatch();

    const handlePageChange = (index) => {
        dispatch(pageChange(index));
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <Button
                    key={i}
                    disabled={i === currentPage}
                    onClick={() => handlePageChange(i)}
                    colorScheme={i === currentPage ? 'red' : 'gray'}
                >
                    {i}
                </Button>
            );
        }

        return buttons;
    };

    return (
        <Box style={{ margin: '40px' }}>
            <Flex alignItems="center" justifyContent="space-between" mb={4}>

                <Text>{` ${selectedRows.length} of ${data.length} row(s) selected`}</Text>

                <HStack spacing={4}>

                    <Text>{`Pages ${currentPage} of ${totalPages}`}</Text>

                    <Button
                        onClick={() => handlePageChange(1)}
                        isDisabled={currentPage === 1}
                        variant="solid"
                        colorScheme="gray"
                    >
                        <ArrowLeftIcon />
                    </Button>
                    <Button
                        onClick={() => handlePageChange(currentPage - 1)}
                        isDisabled={currentPage === 1}
                        variant="solid"
                        colorScheme="gray"
                    >
                        <ChevronLeftIcon />
                    </Button>
                    {renderPaginationButtons()}
                    <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        isDisabled={currentPage === totalPages}
                        variant="solid"
                        colorScheme="gray"
                    >
                        <ChevronRightIcon />
                    </Button>
                    <Button
                        onClick={() => handlePageChange(totalPages)}
                        isDisabled={currentPage === totalPages}
                        variant="solid"
                        colorScheme="gray"
                    >
                        <ArrowRightIcon />
                    </Button>
                </HStack>
            </Flex>
        </Box>
    );
}

export default PaginationButtons;
