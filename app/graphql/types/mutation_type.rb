module Types
  class MutationType < Types::BaseObject
    field :user_signup, mutation: Mutations::UserSignup
  end
end
