class Mutations::UserSignup < Mutations::BaseMutation
  argument :name, String, required: true
  argument :email, String, required: true
  argument :password, String, required: true
  argument :password_confirmation, String, required: true

  field :user, Types::UserType, null: true

  def call(name:, email:, password:, password_confirmation:)
    user = User.create!(
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    )
    {
      user: user
    }
  end
end
