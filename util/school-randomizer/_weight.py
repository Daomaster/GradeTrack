import _assignment
import json

class Weight():
    def __init__( self, _type, weight = 1 ):
        self.type = _type
        self.weight = weight

    def dict( self ):
        return {
            "type" : self.type,
            "weight" : self.weight
        }

    def json( self, indent = None, sort_keys = False ):
        return json.dumps( self.dict(), indent = indent, sort_keys = sort_keys )

    def __str__( self ):
        return "type: " + self.type + "\nweight: " + str( self.weight )

if __name__ == "__main__":
    import rand
    weight = rand.Weight()

    print weight
    print weight.dict()
    print weight.json( indent = 2 )
