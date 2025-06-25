import React from 'react';
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from 'react-hook-form';
import Input, {InputProps} from './Input';

type ControlledInputProps<T extends FieldValues> = Omit<
  InputProps,
  'value' | 'onChange'
> & {
  name: Path<T>;
  control?: Control<T>;
  rules?: RegisterOptions<T>;
  defaultValue?: PathValue<T, Path<T>>;

  controlProps?: Omit<ControllerProps<T>, 'name' | 'control' | 'render'>;
};

const ControlledInput = <T extends FieldValues>({
  name,
  control,
  controlProps,
  ...props
}: ControlledInputProps<T>) => {
  return (
    <Controller<T>
      name={name}
      control={control}
      {...controlProps}
      render={({
        field: {onChange, value, onBlur, ref},
        fieldState: {error},
      }) => (
        <Input
          ref={ref}
          value={value}
          onChangeText={onChange}
          error={error?.message}
          onBlur={onBlur}
          {...props}
        />
      )}
    />
  );
};

export default ControlledInput;
