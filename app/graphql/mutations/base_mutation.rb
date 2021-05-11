module Mutations
  class BaseMutation < GraphQL::Schema::Mutation
    argument_class Types::BaseArgument
    field_class Types::BaseField
    input_object_class Types::BaseInputObject
    object_class Types::BaseObject

    field :errors, [Types::UserErrorType], null: true

    def resolve(*args1, **args2)
      call(*args1, **args2)
    rescue ActiveRecord::RecordNotFound => e
      new_message = e.message.gsub(/Couldn\'t find (\w+).+/) { "Can't find the #{Regexp.last_match[1].humanize}" } rescue 'Not Found'
      {
        errors: [
          {
            message: new_message,
            key: e.primary_key
          }
        ]
      }
    rescue ActiveRecord::RecordInvalid => e
      {
        errors: FormError.from_model(e.record).data.each_pair.map do |key, message|
          {
            message: message,
            key: key.to_s.camelize(:lower)
          }
        end
      }
    rescue FormError => e
      {
        errors: e.data.each_pair.map do |key, message|
          {
            message: message,
            key: key.to_s.camelize(:lower)
          }
        end
      }
    rescue UserError => e # TODO: add NotAuthorizedError for a specific permission library
      {
        errors: [
          {
            message: e.message,
            key: e.respond_to?(:key) ? e.key.to_s.camelize(:lower) : nil
          }
        ]
      }
    rescue => e
      # TODO: report to a 3rd party service
      Rails.logger.error e.message
      Rails.logger.error e.backtrace.join("\n")
      {
        errors: [
          {
            message: 'Some Error Occurred',
            key: nil
          }
        ]
      }
    end

    protected

    def call(*args1, **args2)
      raise StandardError, 'Needs to be implemented'
    end
  end
end
