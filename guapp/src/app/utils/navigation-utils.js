export class NavigationUtils{
    static navigate(route){
        return new CustomEvent('navigate', { detail: route });
    }
}