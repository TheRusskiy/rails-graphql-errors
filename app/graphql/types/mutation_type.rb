module Types
  class MutationType < Types::BaseObject
    field :my_form_submit, mutation: Mutations::MyFormSubmit
  end
end
