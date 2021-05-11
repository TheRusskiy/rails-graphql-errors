class FormError < UserError
  def initialize(data)
    message = data.values.join('. ')
    super(message, data)
  end
end
