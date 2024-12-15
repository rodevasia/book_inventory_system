import { createLazyFileRoute } from "@tanstack/react-router";
import Button from "../components/Button";
import {
  Box,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import NewBook from "../components/page/BookForm";
import React, { useEffect } from "react";
import { useBooksQuery, deleteBookMutation } from "../api/books";
import { Books } from "../api/books.model";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { downloadJSONFile } from "../api/download";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [open, setOpen] = React.useState(false);
  const {
    data,
    isFetching,
    isRefetching,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    fetchPreviousPage,
  } = useBooksQuery();
  const [book, setBook] = React.useState<Books>();
  const { mutate: deleteBook } = deleteBookMutation(() => {
    refetch();
    toast.success("Book Deleted Successfully");
  });
  const [page, setPage] = React.useState(0);
  const columns: GridColDef[] = [
    { field: "title", headerName: "Book Name", width: 200 },
    { field: "author", headerName: "Author", width: 150 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "publication_date", headerName: "Publication Date", width: 150 },
    { field: "isbn", headerName: "ISBN", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <div>
          <IconButton
            color="primary"
            onClick={() => {
              setBook(params.row);
              setOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => deleteBook(params.row.entry_id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const rows = (
    !isFetching && !isRefetching
      ? data?.pages[page]?.results
      : Array.from({ length: 10 }, (_, i) => ({
          id: i,
          title: "Loading...",
          author: "Loading...",
          genre: "Loading...",
          publication_date: "Loading...",
          isbn: "Loading...",
        }))
  ).map((book: Books, index: number) => ({
    id: index + 1,
    ...book,
  }));

  return (
    <div className=" flex flex-col w-full px-40 h-full">
      <div className="flex justify-between px-5 items-center border-2 py-3 my-5 w-full mx-auto rounded-lg ">
        <h3 className="font-bold text-xl">Books List</h3>
        <div className="flex gap-x-2">
          <Button onClick={() => setOpen(true)} text="Add Book" />
          {data?.pages && (
            <Button
              onClick={() =>
                downloadJSONFile(data?.pages, `books_${Date.now()}`)
              }
              text="Export Data"
            />
          )}
        </div>
      </div>
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={isFetching || isRefetching || isFetchingNextPage}
          paginationMode="server"
          rowCount={data?.pages[0]?.count ?? 0}
          pageSizeOptions={[100]}
          onPaginationModelChange={(model) => {
            console.log(model);

            setPage(model.page);

            if (model.page > page) {
              fetchNextPage();
            } else {
              fetchPreviousPage();
            }
          }}
          // checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      <Dialog
        onClose={() => setOpen(false)}
        className="rounded-2xl"
        open={open}
      >
        <NewBook
          book={book}
          onSuccess={() => {
            setOpen(false);
            refetch();
          }}
        />
      </Dialog>
    </div>
  );
}
