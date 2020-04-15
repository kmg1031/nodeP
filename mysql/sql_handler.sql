DECLARE handler_action HANDLER
    FOR condition_value [, condition_value] ...
    statement
 
handler_action:
    CONTINUE
  | EXIT
  | UNDO
 
condition_value:
    mysql_error_code
  | SQLSTATE [VALUE] sqlstate_value
  | condition_name
  | SQLWARNING
  | NOT FOUND
  | SQLEXCEPTION
