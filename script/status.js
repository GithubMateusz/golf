export class Status
{
    /*
    start_game
    start_animation
    end_animation
    wait
    next_level
    end_game
    */
    constructor()
    {
        this._status = 'start_game'
    }

    check(status)
    {
        if(this._status === status)
        {
            return true;
        }
        return false;
    }

    change(status)
    {
        this._status = status;
    }


}