const url = 'http://www.huan-sa-hsu-game.somee.com/GameService.asmx';

// Config exported
export const config = { headers: { 'Content-Type': 'text/xml'} };

// Url exported
export const read_all_games = url + '?op=GetAll';
export const create_new_game = url + '?op=Add';
export const read_details_game = url + '?op=GetDetails';
export const edit_game = url + '?op=Update';
export const delete_game = url + '?op=Delete';
export const search_game = url + '?op=Search';