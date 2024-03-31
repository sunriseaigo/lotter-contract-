import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "./DataTable";
import Layout from "@/components/Layout";
import { Button, Flex, useColorModeValue } from '@chakra-ui/react'
import lottoryContract from "../../utils/abis/lottory.json"

type UnitConversion = {
    fromUnit: string;
    toUnit: string;
    factor: number;
};

const data: UnitConversion[] = [
    {
        fromUnit: "inches",
        toUnit: "millimetres (mm)",
        factor: 25.4
    },
    {
        fromUnit: "feet",
        toUnit: "centimetres (cm)",
        factor: 30.48
    },
    {
        fromUnit: "yards",
        toUnit: "metres (m)",
        factor: 0.91444
    }
];

const columnHelper = createColumnHelper<UnitConversion>();

const columns = [
    columnHelper.accessor("fromUnit", {
        cell: (info) => info.getValue(),
        header: "To convert"
    }),
    columnHelper.accessor("toUnit", {
        cell: (info) => info.getValue(),
        header: "Into"
    }),
    columnHelper.accessor("factor", {
        cell: (info) => info.getValue(),
        header: "Multiply by",
        meta: {
            isNumeric: true
        }
    })
];

export default function App() {
    return (
        <Layout>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 40 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}
                justifyContent="end"
            >
                <Button
                    px={4}
                    fontSize={'sm'}
                    // rounded={'full'}
                    bg={'blue.400'}
                    color={'white'}
                    boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    }
                    _hover={{
                        bg: 'blue.500',
                    }}
                    _focus={{
                        bg: 'blue.500',
                    }}
                    mr={10}
                >
                    Start Betting
                </Button>
                <Button
                    px={4}
                    fontSize={'sm'}
                    // rounded={'full'}
                    bg={'red.400'}
                    color={'white'}
                    boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    }
                    _hover={{
                        bg: 'red.500',
                    }}
                    _focus={{
                        bg: 'red.500',
                    }}>
                    End Betting
                </Button>
            </Flex>
            <ChakraProvider>
                <DataTable columns={columns} data={data} />
            </ChakraProvider>
        </Layout>
    );
}