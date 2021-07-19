document.addEventListener('alpine:init', () => {
    Alpine.data('js_init_data', () => ({
        render: 'Hello World',
        open: false,
        toggle() {
            this.open = !this.open
        },
        init() {
            console.log('js_init_data init event')
        },
    }))

    Alpine.data('x_bind', () => ({
        open: false,
        trigger: {
            ['@click']() {
                this.open = true
            },
        },
        dialogue: {
            ['x-show']() {
                return this.open
            },
            ['@click.outside']() {
                this.open = false
            },
        },
    }))
})
