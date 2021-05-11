class UserError < StandardError
  attr_accessor :data, :key
  def initialize(message, data = nil, options = {})
    @data = data
    @key = options[:key]
    super(message)
  end
end
