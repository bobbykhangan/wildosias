import { useForm } from 'react-hook-form';
import styled, { css } from "styled-components";


// import { useCreateCabin } from 'features/cabins/useCreateCabin';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input.jsx';
import Form from '../../ui/Form.jsx';
import Button from '../../ui/Button.jsx';
import Label from '../../ui/Label.jsx';
import FileInput from '../../ui/FileInput.jsx';
// import { useEditCabin } from './useEditCabin';
import { Textarea } from '../../ui/Textarea.jsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins.js';

// We use react-hook-form to make working with complex and REAL-WORLD forms a lot easier. It handles stuff like user validation and errors. manages the form state for us, etc
// Validating the user’s data passed through the form is a crucial responsibility for a developer.
// React Hook Form takes a slightly different approach than other form libraries in the React ecosystem by adopting the use of uncontrolled inputs using ref instead of depending on the state to control the inputs. This approach makes the forms more performant and reduces the number of re-renders.


// Receives closeModal directly from Modal
function CreateCabinForm({ cabinToEdit = {}}) {
 const {id: editID, ...editValues } = cabinToEdit;
 const isEditSession = Boolean(editID);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const {errors} = formState;
  console.log(errors)

  const queryClient = useQueryClient();

  const {mutate, isLoading: isCreating} = useMutation({
      mutationFn: createCabin,
      onSucess: () =>{
        alert("new cabin is successfully created")
        queryClient.invalidateQueries({queryKey: ["cabins"] });
        reset();
      },

      onError: (err) =>alert("error is here")
  });

  
  function onSubmit(data) {
        mutate({...data, image: data.image[0]});
  }

  function onError(errors) {
    console.log(errors);
  } 

  return  (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type ="text" id="name" {...register("name", {
          required: "this field is required",
        })}></Input>
        
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type ="number" id="maxCapacity" {...register("maxCapacity",  {
          required: "this field is required"}
        )}></Input>
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type ="number" id="regularPrice" {...register("regularPrice",  {
          required: "this field is required"
     })}></Input>
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input type ="number" id="discount" {...register("discount" , {
          required: "this field is required"}
          )}></Input>
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Descriptions for website</Label>
        <Textarea type ="number" id="description" {...register("description",  {
          required: "this field is required" })}></Textarea>
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id ="image" accept="image/*" type='file'{...register("image")} />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
