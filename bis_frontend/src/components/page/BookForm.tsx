import { CircularProgress, TextField } from "@mui/material";
import { useForm, standardSchemaValidator } from "@tanstack/react-form";
import zod from "zod";
import Button from "../Button";
import { addBooksMutation, updateBookMutation } from "../../api/books";
import { toast } from "react-toastify";
import { Books } from "../../api/books.model";

interface NewBookProps {
  onSuccess: () => void;
  book?: Books;
}

function BooksForm({ onSuccess, book }: NewBookProps) {
  const { mutate: addBooks, isPending } = addBooksMutation(() => {
    toast.success("Book Added Successfully");
    onSuccess();
  });
  const { mutate: updateBook } = updateBookMutation(() => {
    toast.success("Book Updated Successfully");
    onSuccess();
  });
  const form = useForm({
    defaultValues: {
      title: book?.title || "",
      author: book?.author || "",
      genre: book?.genre || "",
      publication_date: book?.publication_date || "",
      isbn: book?.isbn || "",
    },
    onSubmit: ({ value }) => {
      if (book) {
        updateBook({ ...value, entry_id: book.entry_id });
      } else addBooks(value);
    },
  });

  return (
    <div className="w-full p-5">
      <h5 className="py-4 text-xl font-bold">{book ? "Update" : "New"} Book</h5>
      <div
        className="flex"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form className="w-full flex flex-wrap gap-x-1 gap-y-4">
          <form.Field
            validatorAdapter={standardSchemaValidator()}
            validators={{
              onChange: zod.string().nonempty("Book Name is required"),
            }}
            name="title"
          >
            {(field) => {
              return (
                <TextField
                  value={field.state.value}
                  name={field.name}
                  className="w-full "
                  onChange={(e) => field.handleChange(e.target.value)}
                  label="Title"
                  error={field.state.meta.errors.length > 0}
                  helperText={
                    field.state.meta.errors.length > 0
                      ? field.state.meta.errors
                      : ""
                  }
                />
              );
            }}
          </form.Field>
          <form.Field
            validatorAdapter={standardSchemaValidator()}
            validators={{
              onChange: zod.string().nonempty("Author is required"),
            }}
            name="author"
          >
            {(field) => {
              return (
                <TextField
                  value={field.state.value}
                  name={field.name}
                  className="w-full"
                  onChange={(e) => field.handleChange(e.target.value)}
                  label="Author"
                  error={field.state.meta.errors.length > 0}
                  helperText={
                    field.state.meta.errors.length > 0
                      ? field.state.meta.errors
                      : ""
                  }
                />
              );
            }}
          </form.Field>
          <form.Field
            validatorAdapter={standardSchemaValidator()}
            validators={{
              onChange: zod.string().nonempty("Genre is required"),
            }}
            name="genre"
          >
            {(field) => {
              return (
                <TextField
                  value={field.state.value}
                  name={field.name}
                  className="w-1/3"
                  onChange={(e) => field.handleChange(e.target.value)}
                  label="Genre"
                  error={field.state.meta.errors.length > 0}
                  helperText={
                    field.state.meta.errors.length > 0
                      ? field.state.meta.errors
                      : ""
                  }
                />
              );
            }}
          </form.Field>
          <form.Field
            validatorAdapter={standardSchemaValidator()}
            validators={{
              onChange: zod.string().nonempty("Published Date is required"),
            }}
            name="publication_date"
          >
            {(field) => {
              return (
                <TextField
                  type="date"
                  value={field.state.value}
                  name={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                  label="Publication Date"
                  className="w-[65.9%]"
                  slotProps={{ inputLabel: { shrink: true } }}
                  error={field.state.meta.errors.length > 0}
                  helperText={
                    field.state.meta.errors.length > 0
                      ? field.state.meta.errors
                      : null
                  }
                />
              );
            }}
          </form.Field>
          <form.Field
            validatorAdapter={standardSchemaValidator()}
            validators={{
              onChange: zod
                .string()
                .nonempty("ISBN is required")
                .refine(
                  (isbn) => {
                    // Remove hyphens for validation
                    const cleanIsbn = isbn.replace(/-/g, "");

                    // ISBN-10 validation
                    const isISBN10 =
                      /^[0-9]{9}[0-9X]$/.test(cleanIsbn) &&
                      cleanIsbn.split("").reduce((sum, char, index) => {
                        const digit = char === "X" ? 10 : parseInt(char, 10);
                        return sum + digit * (10 - index);
                      }, 0) %
                        11 ===
                        0;

                    // ISBN-13 validation
                    const isISBN13 =
                      /^[0-9]{13}$/.test(cleanIsbn) &&
                      cleanIsbn.split("").reduce((sum, char, index) => {
                        const digit = parseInt(char, 10);
                        return sum + digit * (index % 2 === 0 ? 1 : 3);
                      }, 0) %
                        10 ===
                        0;

                    return isISBN10 || isISBN13;
                  },
                  {
                    message: "Invalid ISBN",
                  }
                ),
            }}
            name="isbn"
          >
            {(field) => {
              return (
                <TextField
                  value={field.state.value}
                  name={field.name}
                  className="w-full"
                  onChange={(e) => field.handleChange(e.target.value)}
                  label="ISBN"
                  error={field.state.meta.errors.length > 0}
                  helperText={
                    field.state.meta.errors.length > 0
                      ? field.state.meta.errors
                      : ""
                  }
                />
              );
            }}
          </form.Field>
          <form.Subscribe
            selector={(state) => ({ canSubmit: state.canSubmit })}
          >
            {({ canSubmit }) => {
              return (
                <Button
                  disabled={!canSubmit}
                  text={!isPending ? "Submit" : <CircularProgress size={20} />}
                  className="w-full"
                  type="submit"
                />
              );
            }}
          </form.Subscribe>
        </form>
      </div>
    </div>
  );
}

export default BooksForm;
