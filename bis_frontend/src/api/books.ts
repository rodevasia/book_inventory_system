import { Books } from "./books.model";
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify';

const addBooks = (data: Books) => fetch('/api/books/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
});

const getBooks = (url: string) => fetch(url).then((res) => res.json());


export const addBooksMutation = (onSuccess: () => void) => useMutation({
    mutationFn: addBooks,
    onSuccess,
    onError: (error: any) => {
        console.log(error);

        // toast.error(error.response.data.message);
    }
})

export const useBooksQuery = () => {
    return useInfiniteQuery({
        queryKey: ["books"],
        initialData: { pages: [], pageParams: [] },
        initialPageParam: '/api/books/',
        getNextPageParam: (lastPage: any) => lastPage.next?.replace('http://localhost:8000', ''),
        getPreviousPageParam: (firstPage: any) => firstPage.previous?.replace('http://localhost:8000', ''),
        queryFn: ({ pageParam }) => getBooks(pageParam),
    }
    );
};

const updateBook = (data: Books) => fetch(`/api/books/${data.entry_id}/`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
});

export const updateBookMutation = (onSuccess: () => void) => useMutation({
    mutationFn: updateBook,
    onSuccess,
    onError: (error: any) => {
        console.log(error);
        toast.error("Error updating book");
    }
})

const deleteBook = (id: number) => fetch(`/api/books/${id}/`, {
    method: 'DELETE',
});

export const deleteBookMutation = (onSuccess: () => void) => useMutation({
    mutationFn: deleteBook,
    onSuccess,
    onError: (error: any) => {
        console.log(error);
        toast.error("Error deleting book");
    }
})