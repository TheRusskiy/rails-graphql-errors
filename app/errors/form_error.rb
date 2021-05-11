class FormError < UserError
  def initialize(data)
    message = data.values.join('. ')
    super(message, data)
  end

  def self.from_model(model)
    data = model.errors.map do |field, message|
      [field, model.errors.full_message(field, message)]
    end.to_h
    new(data)
  end
end
