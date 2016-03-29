import datetime
import json

class Assignment():
    def __init__( self, _id, title = None, total = None, _type = None, assigned = None, due = None ):
        self.id = _id

        if title is None or isinstance( title, str ):
            self.title = title
        else:
            raise Exception( "Assignment title is expected to be either None or str type, but recieved variable of type \'" + title.__class__.__name__ + "\'." )

        if total is None or type( total ) is int or type( total ) is float or type( total ) is long:
            self.total = total
        else:
            raise Exception( "Assignment total is expected to be either None or of type int, long or float, but recieved variable of type \'" + total.__class__.__name__ + "\'." )

        if _type is None or isinstance( _type, str ):
            self.type = _type
        else:
            raise Exception( "Assignment type is expected to be either None or str, but recieved variable of type \'" + _type.__class__.__name__ + "\'." )

        if assigned is None or isinstance( assigned, datetime.datetime ):
            self.assigned = assigned
        else:
            raise Exception( "Assignment assigned date is expected to be either None or datetime.datetime, but recieved variable of type \'" + _assigned.__class__.__name__ + "\'." )

        if due is None or isinstance( assigned, datetime.datetime ):
            self.due = due
        else:
            raise Exception( "Assignment due date is expected to be either None or datetime.datetime, but recieved variable of type \'" + _due.__class__.__name__ + "\'." )


    def dict( self ):
        return {
            "id" : self.id,
            "title" : self.title,
            "total" : self.total,
            "type" : self.type,
            "assigned" : {
                "year" : self.assigned.year,
                "month" : self.assigned.month,
                "day" : self.assigned.day,
                "hour" : self.assigned.hour,
                "minute" : self.assigned.minute,
                "second" : self.assigned.second
            },
            "due" : {
                "year" : self.due.year,
                "month" : self.due.month,
                "day" : self.due.day,
                "hour" : self.due.hour,
                "minute" : self.due.minute,
                "second" : self.due.second
            }
        }

    def json( self, indent = None, sort_keys = False ):
        return json.dumps( self.dict(), indent = indent, sort_keys = sort_keys )
        
    def __str__( self ):
        format = "%-10s %s\n"
        temp =  format % ( "id:", self.id )
        temp += format % ( "title:", self.title )
        temp += format % ( "total:", self.total )
        temp += format % ( "type:", self.type )
        temp += format % ( "assigned:", self.assigned )
        temp += format % ( "due:", self.due )

        return temp[ : -1]

if __name__ == "__main__":
    import rand
    assignment = rand.Assignment()

    print assignment
    print assignment.dict()
    print assignment.json( indent = 2 )

