import { useForm } from 'react-hook-form';
import styled, { css } from "styled-components";


// import { useCreateCabin } from 'features/cabins/useCreateCabin';
// import FormRow from 'ui/FormRow';
import Input from '../../ui/Input.jsx';
import Form from '../../ui/Form.jsx';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
// import { useEditCabin } from './useEditCabin';
import { Textarea } from '../../ui/Textarea';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins.js';
import { id } from 'date-fns/locale';

// We use react-hook-form to make working with complex and REAL-WORLD forms a lot easier. It handles stuff like user validation and errors. manages the form state for us, etc
// Validating the user’s data passed through the form is a crucial responsibility for a developer.
// React Hook Form takes a slightly different approach than other form libraries in the React ecosystem by adopting the use of uncontrolled inputs using ref instead of depending on the state to control the inputs. This approach makes the forms more performant and reduces the number of re-renders.

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24 rem 1fr 1.2fr;
  gap: 2.4 rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--)
  }

  /* Special treatment if the row contains buttons, and if it's NOT a vertical row */
  
      &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
      }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;


// Receives closeModal directly from Modal
function CreateCabinForm({ cabinToEdit  = {} }) {

  const {id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const {errors} = formState;
  console.log(errors)

  const queryClient = useQueryClient();

  const {mutate : createCabin, isLoading: isCreating} = useMutation({
      mutationFn: createEditCabin,
      onSucess: () =>{
        alert("new cabin is successfully created")
        queryClient.invalidateQueries({queryKey: ["cabins"] });
        reset();
      },

      onError: (err) =>alert("error is here")
  });
  
  const {mutate: editCabin, isLoading: isEditing} = useMutation({
    mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),
    onSucess: () =>{
      alert("new cabin is successfully created")
      queryClient.invalidateQueries({queryKey: ["cabins"] });
      reset();
    },

    onError: (err) =>alert("error is here")
  });
  
  const isWorking = isCreating || isEditing;
  function onSubmit(data) {
      const image = typeof data.image === "string" ? data.image : data.image[0]; 

       if(isEditSession) editCabin({newCabinData: {
      ...data, image}, id: editId});
       else createCabin({ ...data, image: data.image[0]});
        // mutate({...data, image: data.image[0]});
  }

  function onError(errors) {
    console.log(errors);
  } 

  return  (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type ="text" id="name" disabled={isWorking}{...register("name", {
          required: "this field is required",
        })}></Input>
        
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type ="number" id="maxCapacity" disabled={isWorking} {...register("maxCapacity",  {
          required: "this field is required"}
        )}></Input>
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type ="number" id="regularPrice" disabled={isWorking} {...register("regularPrice",  {
          required: "this field is required"
     })}></Input>
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input type ="number" id="discount" disabled={isWorking} {...register("discount" , {
          required: "this field is required"}
          )}></Input>
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Descriptions for website</Label>
        <Textarea type ="number" id="description" disabled={isWorking} {...register("description",  {
          required: "this field is required" })}></Textarea>
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id ="image" accept="image/*" disabled={isWorking} type='file'{...register("image")} />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? "Edit cabin" : "Create new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
