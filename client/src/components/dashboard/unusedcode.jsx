<form
  action='#'
  className='flex w-full flex-col items-center md:flex-row md:gap-x-3'
>
  <Label
    htmlFor='email'
    className='mb-2 mr-auto flex-shrink-0 text-sm font-medium text-gray-500 dark:text-gray-400 md:m-0 md:mb-0'
  >
    {tableHeader}
  </Label>
  <TextInput id='email' placeholder='Enter your email' required type='email' />
</form>;
