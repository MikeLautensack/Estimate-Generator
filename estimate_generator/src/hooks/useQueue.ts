import React, { useState } from 'react'

const useQueue = <T>() => {
    const [queue, setQueue] = useState<T[]>([]);

    const enqueue = (item: T) => {
        setQueue([...queue, item]);
    };

    const dequeue = () => {
        setQueue(queue.slice(1));
    };

    return [ queue, enqueue, dequeue ] as const;
}

export default useQueue