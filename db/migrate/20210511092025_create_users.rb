class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.text :name, null: false
      t.text :email, null: false
      t.password_digest :password, null: false

      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end
