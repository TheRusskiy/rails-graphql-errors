class Mutations::MyFormSubmit < Mutations::BaseMutation
  argument :name, String, required: true
  argument :email, String, required: true
  argument :password, String, required: true
  argument :password_confirmation, String, required: true

  field :user, Types::UserType, null: true

  def call(name:, email:, password:, password_confirmation:)
    if password != password_confirmation
      raise FormError, { password_confirmation: "Passwords must match" }
    end
    user = User.create!(
      name: name,
      email: email,
      password: password
    )
    {
      user: user
    }
  end
end
